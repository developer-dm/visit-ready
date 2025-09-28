import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { generateMedicalQuestionsPrompt } from '@/services/prompter';
import { useDataStore } from '@/stores/dataStore';
import { useTempStore } from '@/stores/tempStore';
import { generateAPIUrl } from '@/utils/utils';
import { useCompletion } from '@ai-sdk/react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import { useRouter } from 'expo-router';
import { fetch as expoFetch } from 'expo/fetch';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

export default function QuestionsScreen() {
	const router = useRouter();
	const [copied, setCopied] = useState(false);
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const { appointment, clearUserContext, setQuestions } = useTempStore();
	const { addAppointment } = useDataStore();

	const { complete, completion } = useCompletion({
		api: generateAPIUrl('/api/completion'),
		fetch: expoFetch as unknown as typeof globalThis.fetch,
		onError: (error) => console.error(error, 'ERROR'),
		streamProtocol: 'text'
	});

	const submitPrompt = async () => {
		if (hasSubmitted) return;
		setHasSubmitted(true)

		const message = generateMedicalQuestionsPrompt(appointment);
		complete(message);
	};

	const copyToClipboard = async () => {
		await Clipboard.setStringAsync(completion);
		setCopied(true);
		setTimeout(() => setCopied(false), 1000);
	};

	const handleReturn = () => {
		Alert.alert('Exit', 'Are you sure you want to exit?', [
			{
				text: 'Exit',
				onPress: () => {
					addAppointment(appointment);
					clearUserContext();
					router.replace("/(tabs)");
				},
				style: "destructive",
			},
			{
				text: 'Cancel',
				style: 'cancel',
			},
		]);
	}

	useEffect(() => {
		if (completion) {
			setQuestions(completion);
		};
	}, [completion])

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.scrollContainer}
			showsVerticalScrollIndicator={false}
		>
			{/* Generate Request */}
			{(!completion && !hasSubmitted) && (
				<>
					<ThemedView style={styles.loadingCard}>
						<View style={styles.loadingContent}>
							<ThemedView style={styles.headerIconContainer} type="dusked">
								<MaterialIcons name="check-circle" size={24} color="#10b981" />
							</ThemedView>
							<ThemedText style={styles.loadingText} type="whitened">
								Confirm
							</ThemedText>
							<ThemedText style={styles.loadingSubtext} type="greyed">
								Would you like to generate personalized questions to ask your provider during your appointment?
							</ThemedText>
						</View>
					</ThemedView>

					<View style={styles.buttonContainer}>
						<Button
							style={[styles.actionButton, styles.primaryButton]}
							onPress={submitPrompt}
						>
							<MaterialIcons name="create" size={20} color="#ffffffff" style={styles.buttonIcon} />
							<Text style={styles.backButtonText}>Yes, generate questions</Text>
						</Button>

						<Button
							style={styles.actionButton}
							type="bordered"
							onPress={handleReturn}
						>
							<MaterialIcons name="exit-to-app" size={20} color="#64748b" style={styles.buttonIcon} />
							<Text style={styles.copyButtonText}>Skip & Return</Text>
						</Button>
					</View>
				</>
			)}

			{/* Loading */}
			{(!completion && hasSubmitted) && (
				<ThemedView style={styles.loadingCard}>
					<View style={styles.loadingContent}>
						<ThemedView style={styles.loadingIconContainer} type="dusked">
							<MaterialIcons name="auto-awesome" size={24} color="#3b82f6" />
						</ThemedView>
						<ThemedText style={styles.loadingText} type="whitened">
							Generating Questions...
						</ThemedText>
						<ThemedText style={styles.loadingSubtext} type="greyed">
							AI can make mistakes. Check important info. This is not medical advice.
						</ThemedText>
						<Flow size={70} color="#3b82f6" />
					</View>
				</ThemedView>
			)}

			{/* Generation */}
			{completion && (
				<>
					<View style={styles.questionsSection}>
						<ThemedText style={styles.sectionTitle}>Questions to Ask Your Doctor</ThemedText>
						<ThemedView style={styles.questionCard}>
							<View style={styles.questionContent}>
								<ThemedText style={styles.questionText} type="whitened">
									{completion}
								</ThemedText>
							</View>
						</ThemedView>
					</View>

					{/* Buttons */}
					<View style={styles.buttonContainer}>
						<Button
							style={styles.actionButton}
							type="bordered"
							onPress={copyToClipboard}
						>
							<MaterialIcons name="content-copy" size={20} color={copied ? '#3b82f6' : '#64748b'} style={styles.buttonIcon} />
							<Text style={[styles.copyButtonText, { color: copied ? '#3b82f6' : '#64748b' }]}>{copied ? 'Copied to Clipboard!' : 'Copy Questions'}</Text>
						</Button>

						<Button
							style={[styles.actionButton, styles.primaryButton]}
							onPress={handleReturn}
						>
							<MaterialIcons name="save" size={20} color="#ffffffff" style={styles.buttonIcon} />
							<Text style={styles.backButtonText}>Return</Text>
						</Button>
					</View>
				</>
			)}
			<View style={styles.midSpacer} />
			<Footer type="relative" text="AI can make mistakes. Check important info. This is not medical advice." hasSpacer={true} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	scrollContainer: {
		flexGrow: 1,
		paddingVertical: 100,
	},
	headerIconContainer: {
		width: 64,
		height: 64,
		borderRadius: 32,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 8,
	},
	loadingCard: {
		marginHorizontal: 24,
		marginBottom: 24,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.1,
		shadowRadius: 10,
	},
	loadingContent: {
		padding: 32,
		alignItems: 'center',
	},
	loadingIconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
	},
	loadingText: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: 'center',
		marginBottom: 8,
	},
	loadingSubtext: {
		fontSize: 14,
		fontWeight: '400',
		textAlign: 'center',
		lineHeight: 20,
		marginBottom: 24,
	},
	questionsSection: {
		paddingHorizontal: 24,
		marginBottom: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '600',
		textAlign: "left",
		marginBottom: 16,
	},
	questionCard: {
		marginBottom: 12,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.08,
		shadowRadius: 10,
	},
	questionContent: {
		padding: 16,
		flexDirection: 'row',
		alignItems: 'flex-start',
		gap: 12,
	},
	questionText: {
		flex: 1,
		fontSize: 16,
		fontWeight: '400',
		lineHeight: 22,
	},
	buttonContainer: {
		paddingHorizontal: 24,
		gap: 12,
		marginTop: 16,
	},
	actionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.08,
		shadowRadius: 10,
		minHeight: 60,
	},
	copyButtonText: {
		fontSize: 16,
		fontWeight: '500',
		marginLeft: 8,
		color: '#64748b'
	},
	primaryButton: {
		backgroundColor: '#3b82f6',
		shadowColor: '#3b82f6',
		shadowOpacity: 0.3,
	},
	backButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#ffffff',
	},
	midSpacer: {
		height: 40,
	},
	buttonIcon: {
		marginRight: 8,
	},
});
