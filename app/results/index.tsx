import { Button } from '@/components/Button';
import { Footer } from '@/components/Footer';
import { LoadingScreen } from '@/components/Loading';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ROUTES from '@/constants/Routes';
import useDataStore from '@/stores/dataStore';
import useTempStore from '@/stores/tempStore';
import { CompletionData } from '@/types/Data';
import generateAPIUrl from '@/utils/generateUrl';
import { useCompletion } from '@ai-sdk/react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import { fetch as expoFetch } from 'expo/fetch';
import { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

export default function IndexResultsScreen() {
	const [hasSubmitted, setHasSubmitted] = useState(false);
	const { id, appointment, setCompletion, resetTempContext } = useTempStore();
	const { signup, addCompletion } = useDataStore();

	const trimResponse = (text: string) => {
		const codeBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/;
		const match = text.match(codeBlockRegex);
		return match?.[1]?.trim() || text.trim();
	};

	const handleError = (error: Error) => {
		Alert.alert('Error', error.message, [
			{
				text: 'Return', style: "destructive",
				onPress: handleReturn,
			},
		]);
	};

	const { complete, completion } = useCompletion({
		api: generateAPIUrl(ROUTES.API_COMPLETION),
		fetch: expoFetch as unknown as typeof globalThis.fetch,
		onError: (error) => handleError(error),
		streamProtocol: 'text'
	});

	const submitPrompt = async () => {
		if (hasSubmitted || !signup || !appointment) return;

		setHasSubmitted(true);
		const message = JSON.stringify({ signup, appointment });
		complete(message);
	};

	const handleReturn = () => {
		router.replace(ROUTES.DASHBOARD);
		resetTempContext();
	};

	useEffect(() => {
		if (!completion) return;

		try {
			const parsedCompletion: CompletionData = JSON.parse(trimResponse(completion));
			if (!parsedCompletion) return;

			setCompletion(parsedCompletion);
			addCompletion(parsedCompletion, id);
			router.replace(ROUTES.RESULTS_2);
		} catch (error) {
			console.error('Failed to parse completion:', error);
		}
	}, [completion, id, addCompletion, setCompletion]);

	if (hasSubmitted) {
		return (
			<LoadingScreen
				visible={true}
				message="Loading..."
				subMessage="Generating insights"
			/>
		);
	}

	return (
		<View style={styles.container}>
			<ThemedView style={styles.loadingCard}>
				<View style={styles.loadingContent}>
					<ThemedView style={styles.headerIconContainer} type="dusked">
						<MaterialIcons name="chat" size={32} color="#3b82f6" />
					</ThemedView>
					<ThemedText style={styles.loadingText} type="whitened">
						Confirm
					</ThemedText>
					<ThemedText style={styles.loadingSubtext} type="greyed">
						Would you like to generate personalized insights for your appointment?
					</ThemedText>
				</View>
			</ThemedView>

			<View style={styles.buttonContainer}>
				<Button
					style={[styles.actionButton, styles.primaryButton]}
					onPress={submitPrompt}
				>
					<MaterialIcons name="create" size={20} color="#ffffff" style={styles.buttonIcon} />
					<Text style={styles.primaryButtonText}>Generate insights</Text>
				</Button>

				<Button
					style={styles.actionButton}
					type="bordered"
					onPress={handleReturn}
				>
					<MaterialIcons name="arrow-forward" size={20} color="#64748b" style={styles.buttonIcon} />
					<Text style={styles.secondaryButtonText}>Return</Text>
				</Button>
			</View>
			<Footer text="AI can make mistakes. Check important info. This is not medical advice." top={40} hasSpacer={true} />
		</View>
	);
}

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
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 3,
	},
	loadingCard: {
		marginHorizontal: 24,
		marginBottom: 24,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 3,
	},
	loadingContent: {
		padding: 32,
		alignItems: 'center',
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
		paddingHorizontal: 24,
		marginTop: 16,
		width: '100%',
		maxWidth: 500,
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
	primaryButton: {
		backgroundColor: '#3b82f6',
	},
	primaryButtonText: {
		fontSize: 16,
		fontWeight: '600',
		color: '#ffffff',
		marginLeft: 8,
	},
	secondaryButtonText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#64748b',
		marginLeft: 8,
	},
	buttonIcon: {
		marginRight: 8,
	},
});
