import * as vscode from 'vscode';

let intervalNumber: NodeJS.Timer;

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('drink-water.startReminder', async () => {

		let userInput = await vscode.window.showInputBox({
			placeHolder: "Time in minutes",
			prompt: "How often do you want a water reminder?"
		});

		// Basic error handling. Exit out if invalid input given.
		if (userInput === undefined) {
			return;
		}

		// Convert and error check
		let timeInMinutes = formatMinutes(userInput);
		if (Number.isNaN(timeInMinutes)) {
			vscode.window.showErrorMessage(`DrinkWater: Invalid time interval given: ${userInput}. Must be a number representing minutes e.g. 5`);
			return;
		}

		// Set the reminder interval
		if (intervalNumber !== undefined) {
			vscode.window.showInformationMessage('DrinkWater: Resetting the current reminder interval.');
			clearInterval(intervalNumber);
		}

		console.log(`Sending a drink water reminder every ${userInput} minutes.`);
		intervalNumber = setInterval(displayWaterReminder, timeInMinutes);

		vscode.window.showInformationMessage(`DrinkWater: Reminding you to hydrate every ${userInput} minutes!`);
	});

	context.subscriptions.push(disposable);
}

// Clean up just in case
export function deactivate() {
	console.log(`Stopping interval ${intervalNumber}`);
	clearInterval(intervalNumber);
}

// Creates the notification window for the drink water reminder
function displayWaterReminder() {
	vscode.window.showInformationMessage("🥤 DrinkWater: It's time to drink water! 🥤");
}

// Convert the user input into milliseconds
function formatMinutes(userInput: string): number {
	let timeInMinutes = parseFloat(userInput!) * 60000;
	return timeInMinutes;
}
