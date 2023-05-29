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

		// Basic error handling
		if (userInput === undefined) {
			vscode.window.showErrorMessage('You must enter a time interval in minutes.');
		}
		// Convert and error check
		let timeInMinutes = parseFloat(userInput!) * 60000;
		if (Number.isNaN(timeInMinutes)) {
			vscode.window.showErrorMessage(`Invalid time interval given: ${userInput}`);
		}

		// Set the reminder interval
		console.log(`Sending a drink water reminder every ${userInput} minutes.`);
		intervalNumber = setInterval(displayWaterReminder, timeInMinutes);
	});
	
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
	console.log(`Stopping interval ${intervalNumber}`);
	clearInterval(intervalNumber);
}

// This method creates the notification window for the drink water reminder
function displayWaterReminder() {
	console.log("Sending reminder...");
	vscode.window.showInformationMessage("It's time to drink water!");
}