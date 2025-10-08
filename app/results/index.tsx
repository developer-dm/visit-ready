import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useDataStore } from '@/stores/dataStore';
import { useTempStore } from '@/stores/tempStore';
import { CompletionData } from '@/types/models';
import { generateAPIUrl } from '@/utils/utils';
import { useCompletion } from '@ai-sdk/react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { fetch as expoFetch } from 'expo/fetch';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

export default function IndexResultsScreen() {
	const router = useRouter();
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const { id, appointment, tempCompletion, setCompletion, resetTempContext } = useTempStore();
	const { signup, addCompletion } = useDataStore();

	function trimResponse(text: string): string {
		const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
		const match = text.match(codeBlockRegex);

		if (match && match[1]) {
			return match[1].trim();
		}

		return text.trim();
	}

	const { complete, completion } = useCompletion({
		api: generateAPIUrl('/api/completion'),
		fetch: expoFetch as unknown as typeof globalThis.fetch,
		onError: (error) => console.error(error, 'ERROR'),
		streamProtocol: 'text'
	});

	const submitPrompt = async () => {
		if (hasSubmitted) return;
		setHasSubmitted(true);

		if (signup && appointment) {
			const message = JSON.stringify({ signup, appointment });
			complete(message);
		}
	};

	const handleReturn = () => {
		Alert.alert('Exit', 'Are you sure you want to exit?', [
			{
				text: 'Exit',
				onPress: () => {
					router.replace("/(tabs)");
					resetTempContext();
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
			try {
				const parsedCompletion: CompletionData = JSON.parse(trimResponse(completion));
				if (!parsedCompletion) return;

				setCompletion(parsedCompletion);
				addCompletion(parsedCompletion, id);
				router.replace("/results/second");
			} catch (error) {
				console.error('Failed to parse completion:', error);
			}
		}
	}, [completion]);

	return (
		<View style={styles.container}>
			{(!hasSubmitted) && (
				<View>
					<ThemedView style={styles.loadingCard}>
						<View style={styles.loadingContent}>
							<ThemedView style={styles.headerIconContainer} type="dusked">
								<MaterialIcons name="question-mark" size={32} color="#3b82f6" />
							</ThemedView>
							<ThemedText style={styles.loadingText} type="whitened">Confirm</ThemedText>
							<ThemedText style={styles.loadingSubtext} type="greyed">
								Would you like to generate personalized recommendations for your appointment?
							</ThemedText>
						</View>
					</ThemedView>

					<View style={styles.buttonContainer}>
						<Button
							style={[styles.actionButton, styles.primaryButton]}
							onPress={submitPrompt}
						>
							<MaterialIcons name="create" size={20} color="#ffffffff" style={styles.buttonIcon} />
							<Text style={styles.backButtonText}>Generate insights</Text>
						</Button>

						<Button
							style={styles.actionButton}
							type="bordered"
							onPress={handleReturn}
						>
							<MaterialIcons name="arrow-forward" size={20} color="#64748b" style={styles.buttonIcon} />
							<Text style={styles.copyButtonText}>Return</Text>
						</Button>
					</View>
				</View>
			)}

			{(hasSubmitted) && (
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

			<View style={styles.midSpacer} />
			<Footer text="AI can make mistakes. Check important info. This is not medical advice." hasSpacer={true} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerIconContainer: {
		width: 64,
		height: 64,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 10,
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
		width: 64,
		height: 64,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 16,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 10,
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
	buttonContainer: {
		gap: 12,
		marginHorizontal: 24,
		marginTop: 16,
	},
	actionButton: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		paddingVertical: 12,
		paddingHorizontal: 12,
		borderRadius: 10,
		minHeight: 60,
		width: '100%',
	},
	copyButtonText: {
		fontSize: 16,
		fontWeight: '500',
		marginLeft: 8,
		color: '#64748b'
	},
	primaryButton: {
		shadowColor: '#3b82f6',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 10,
		backgroundColor: '#3b82f6',
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
