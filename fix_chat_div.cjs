const fs = require('fs');
let code = fs.readFileSync('src/components/ChatPopup.jsx', 'utf8');

// Remove one </div> from the bottom
const target = `      </div>
      </div>
      </div>
    </div>
  );
};`;
const replace = `      </div>
      </div>
    </div>
  );
};`;

if(code.includes(target)) {
    code = code.replace(target, replace);
}

fs.writeFileSync('src/components/ChatPopup.jsx', code, 'utf8');
console.log('Removed extra </div>.');
