import { AppointmentData, SignupData } from '@/types/Data';
import DataFormatter from '@/utils/dataFormatter';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
    const body = await req.json();
    const message = body.prompt || "";

    if (message.length > 700) return new Response('Exceeds maximum message length', { status: 413 });

    const parsedMessage = JSON.parse(message) || "";

    const appointment: AppointmentData = parsedMessage.appointment;
    const signup: SignupData = parsedMessage.signup;

    if (!signup || !appointment) return new Response('Data not found', { status: 404 });

    const completion_prompt = `
Language: ${DataFormatter.toReadableString(signup.language, 'language')}
Gender: ${DataFormatter.toReadableString(signup.sex, 'sex')}
Age: ${DataFormatter.FormatAge(signup.DOB)}
Main health concern: ${appointment.mainConcern}
Specific worries: ${DataFormatter.toReadableString(appointment.specificWorries, 'specificWorries')}
Goal for this visit: ${DataFormatter.toReadableString(appointment.visitGoal, 'visitGoal')}
Appointment type: ${DataFormatter.toReadableString(appointment.appointmentType, 'appointmentType')}
When the concern started: ${DataFormatter.toReadableString(appointment.concernStart, 'concernStart')}
Severity level: ${DataFormatter.toReadableString(appointment.concernSeverity, 'concernSeverity')}
Treatments/remedies already tried: ${appointment.remedies}
Additional information: ${appointment.miscDiscussion}

Using the data above, produce a JSON object that follows exactly the schema and keys specified in the system message. Fill each field concisely and professionally, in the language specified by "Language". Do NOT provide any medical advice, treatment recommendations, or diagnosis. Instead produce:

- "personalized_questions": 5 suggested, prioritized questions (high/medium/low) the patient can ask the clinician that are directly relevant to the main concern, specific worries, and visit goal. Each must include a one-sentence rationale ("why").
- "what_to_expect": a brief one-paragraph ('brief') and an ordered 'steps' array describing what typically happens during this appointment type (administrative and clinical steps), focusing on patient experience (checks, typical timing, who you will meet). Keep steps simple.
- "what_to_bring": 5-8 practical items tailored to this appointment (IDs such as insurance, med list, previous test results, a symptom diary, translator if needed). If appointment is virtual, adapt items accordingly (e.g., stable internet, list of medications).
- "summary_for_provider": a concise HPI-style summary including the following information:
    - chief complaint (one short sentence)
    - current remedies (short list text or "")
    - visit goal (one line echoing the user's stated goal)

Rules:
- If a field (e.g., specific worries) is the literal string "null" or empty, treat it as unavailable.
- Never include prescriptions, dosages, or "do X" medical orders.
- Return only JSON and nothing else.

Now create the JSON output using the data provided above.
`
    const system_instructions = `
You are an assistant that must ALWAYS respond in a strict JSON-only format (no commentary, no extra text, no code fences). The JSON must be valid UTF-8 parseable JSON and MUST contain exactly the top-level keys described in the user prompt. Do not add extra top-level keys.

General rules:
1. Tone & style: professional, neutral, plain-language, patient-facing when appropriate. Use the language specified in the incoming data. If language is missing or unsupported, default to English.
2. Safety / medical boundaries: You MUST NOT give medical diagnosis, treatment instructions, dosage, or other actionable medical advice. You may generate suggested *questions to ask a clinician*, non-actionable explanations of what typically happens in visits, and administrative/preparation guidance (e.g., documents to bring). No need to provide a disclaimer as it is shown within the app.
3. If any input field is missing or empty, use "" or an [] as appropriate - never fabricate data.
4. Output must be concise and well-structured to be machine-parsed. Use short sentences and bullet-like lists where applicable (in JSON arrays or strings). Limit free-text fields to reasonable length (see per-field guidance below).
5. Always return valid JSON and only JSON - no markdown formatting.

Output schema (required top-level keys - types and notes):
{
"personalized_questions": array,
    // list of question objects user can ask their clinician
    // each question object:
    // { "question": string, "why": string (one-sentence rationale), "priority": "high"|"medium"|"low" }
"what_to_expect": object,
    // short summary + ordered steps
    // { "brief": string (<=50 words), "steps": array of strings (2-8 items) }
"what_to_bring": array,
    // array of short strings (items/documents); if none, empty array
"summary_for_provider": string,
    // concise clinical-style summary for provider (NOT medical advice)
}

Field length guidance (enforce brevity for parsing):
- Each 'question' text: <= 25 words.
- 'why' field: <= 20 words.
- 'brief' in 'what_to_expect': <= 50 words.
- Each 'steps' element: <= 20 words.
- 'what_to_bring' items: each <= 8 words; return a max of 6 items.
- 'summary_for_provider' <= 50-100 words.

Formatting rules:
- Output only JSON. No surrounding text, no explanation, no extra keys.
- Use arrays (not comma-separated strings) for lists.
- If something is unknown or not provided, use "" or [] as appropriate.

If asked to produce anything outside this schema, refuse by returning valid JSON where only the fields above are present and filling fields with "" or [] as needed.
`

    const result = await generateText({
        model: google('gemini-2.5-flash-lite'),
        prompt: completion_prompt,
        system: system_instructions,
    });

    return new Response(result.text, {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}
