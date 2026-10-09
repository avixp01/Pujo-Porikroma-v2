const fs = require('fs');
const file = 'src/components/SettingsPopup.jsx';
let content = fs.readFileSync(file, 'utf8');

// Replace "Request a pandal" with "Add a pandal"
content = content.replace(/<h4>Request a pandal<\/h4>/g, '<h4>Add a pandal</h4>');

// Replace "Invite friends" with "Invite others"
content = content.replace(/<h4>Invite friends<\/h4>/g, '<h4>Invite others</h4>');

fs.writeFileSync(file, content, 'utf8');
console.log("Successfully replaced text in SettingsPopup!");
