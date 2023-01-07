import joplin from 'api';
import JoplinContentScripts from 'api/JoplinContentScripts';
let keyBinds = [
	{
		keys: ['A', 'B', 'C'],
		text: "Hello World"	
	},
	{
		keys: ['D', 'G'],
		text: "DG"
	}
]
joplin.plugins.register({
	onStart: async function () {
		
		let pressedKeys: string[] = [];
		//initialize event listeners
		document.addEventListener('keydown', (e): void => {
			console.log(joplin.workspace.selectedNote());
			if (!pressedKeys.includes(e.key)) {
				pressedKeys.push(e.key);
				isKeybind(pressedKeys)
			}
		});
		document.addEventListener('keyup', (e): void => {
			let b: number = pressedKeys.indexOf(e.key);
			if (b != -1) {
				pressedKeys.splice(b, 1);
			}
		})
		
		function isKeybind(keysPressed: string[]): void {
			keyBinds.forEach((obj) => {
				if (obj.keys == keysPressed) {
					pushText(obj.text);
					}
			})
			
		}
		function pushText(text: string): void {
			joplin.workspace.selectedNote()
		}
	}
});
