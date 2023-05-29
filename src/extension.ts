// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let intervalNumber: NodeJS.Timer;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('drink-water.startReminder', async () => {
		console.log("Starting Drink Water...");

		let userInput = await vscode.window.showInputBox({
			placeHolder: "Time in minutes",
			prompt: "How often do you want a water reminder?"
		});

		console.log(userInput);

		// Basic error handling. Exit out if invalid input given.
		if (userInput === undefined) {
			return;
		}
		// Convert and error check
		let timeInMinutes = parseFloat(userInput!) * 60000;
		if (Number.isNaN(timeInMinutes)) {
			vscode.window.showErrorMessage(`DrinkWater: Invalid time interval given: ${userInput}`);
			return;
		}

		// Set the reminder interval
		if (intervalNumber !== undefined) {
			console.log('Resetting the current reminder interval.');
			clearInterval(intervalNumber);
		}

		console.log(`Sending a drink water reminder every ${userInput} minutes.`);
		intervalNumber = setInterval(displayWaterReminder, timeInMinutes);
		vscode.window.showInformationMessage(`DrinkWater: Reminding you to hydrate every ${userInput} minutes!`);
	});

	context.subscriptions.push(disposable);
}
	
export function deactivate() {
	console.log(`Stopping interval ${intervalNumber}`);
	clearInterval(intervalNumber);
}

// This method creates the notification window for the drink water reminder
function displayWaterReminder() {
	vscode.window.showInformationMessage("🥤 DrinkWater: It's time to drink water! 🥤");
}