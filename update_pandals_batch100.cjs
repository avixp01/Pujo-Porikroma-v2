const fs = require('fs');

const updates = [
  { name: "AE Block", lat: 22.585415, lng: 88.413415 },
  { name: "Ahiritola", lat: 22.593942, lng: 88.346430 },
  { name: "Aikya Sammilani", lat: 22.624205, lng: 88.386896 },
  { name: "AJ Block", lat: 22.592109, lng: 88.428878 },
  { name: "Ajeya Sanghati", lat: 22.480865, lng: 88.335130 },
  { name: "AK Block", lat: 22.588907, lng: 88.426370 },
  { name: "Akshra Temple New Alipore", lat: 22.507098, lng: 88.334449 },
  { name: "AL Block", lat: 22.585918, lng: 88.430477 },
  { name: "Alipore 78 Pally Club", lat: 22.523051, lng: 88.334357 },
  { name: "Alipore Sarbojanin", lat: 22.519172, lng: 88.330826 },
  { name: "Amarendra Bhavan Durga Puja", lat: 22.501587, lng: 88.316298 },
  { name: "Anupama Housing Complex", lat: 22.595221, lng: 88.364424 },
  { name: "Apanjan Club", lat: 22.479053, lng: 88.338162 },
  { name: "Arjunpur Amra Sabai Club", lat: 22.624297, lng: 88.421961 },
  { name: "Arupara Milan Sangha - Howrah", lat: 22.597314, lng: 88.296762 },
  { name: "Aswininagar Bandhumahal Club", lat: 22.610021, lng: 88.430353 },
  { name: "Aswininagar Sarbojanin Durgotsav", lat: 22.607894, lng: 88.432143 },
  { name: "Aurobindo Setu Sarbojanin", lat: 22.594487, lng: 88.377976 },
  { name: "Azadgarh", lat: 22.485820, lng: 88.353621 },
  { name: "BA Block", lat: 22.585114, lng: 88.459626 },
  { name: "Babubagan Club", lat: 22.508028, lng: 88.366007 },
  { name: "Badamtala Ashar Sangha", lat: 22.517967, lng: 88.341150 },
  { name: "Baghbazar Haldar Bari er Pujo", lat: 22.603380, lng: 88.367013 },
  { name: "Baghbazar Jagodharti", lat: 22.603782, lng: 88.366930 },
  { name: "Baghbazar Pally", lat: 22.603782, lng: 88.359205 },
  { name: "Baghbazar Sarbojanin Durga Puja", lat: 22.603782, lng: 88.359205 },
  { name: "Baghbazar Sarbojonin Durgotsab", lat: 22.603782, lng: 88.359205 },
  { name: "Baghajatin B & C Durga Puja Art", lat: 22.484073, lng: 88.373505 },
  { name: "BAGHAJATIN TARUN SANGHA", lat: 22.484395, lng: 88.376034 },
  { name: "Baishnabghata Patuli Upanagari", lat: 22.484393, lng: 88.358010 },
  { name: "Bakul Bagan Sarbojanin", lat: 22.526762, lng: 88.345685 },
  { name: "Ballygunge 21 Pally", lat: 22.529175, lng: 88.366241 },
  { name: "Ballygunge Cultural Association", lat: 22.516212, lng: 88.353231 },
  { name: "Bandhab Sammilani", lat: 22.507895, lng: 88.365380 },
  { name: "Bandhudal Sporting Club", lat: 22.633134, lng: 88.375127 },
  { name: "Bangur Avenue Protirodh Bahini", lat: 22.584038, lng: 88.374373 },
  { name: "Bani Mandir Park", lat: 22.665825, lng: 88.378145 },
  { name: "Barisha Club", lat: 22.481286, lng: 88.310666 },
  { name: "Barisha Janakalyan Sangha", lat: 22.495690, lng: 88.293626 },
  { name: "Barisha Netaji Sangha", lat: 22.486027, lng: 88.312632 },
  { name: "Barisha Player's Corner", lat: 22.485819, lng: 88.311127 },
  { name: "Barisha Sabuj Sathi Club", lat: 22.495364, lng: 88.313518 },
  { name: "Barisha Sarbojonin", lat: 22.479853, lng: 88.305548 },
  { name: "Barisha Tapoban", lat: 22.476437, lng: 88.310544 },
  { name: "Barisha Tarun Tirtha", lat: 22.484458, lng: 88.319271 },
  { name: "Barisha Yubak Brinda", lat: 22.486008, lng: 88.309514 },
  { name: "BB Block", lat: 22.591127, lng: 88.396773 },
  { name: "BC Block", lat: 22.583532, lng: 88.467406 },
  { name: "BD Block", lat: 22.568169, lng: 88.331735 },
  { name: "BE Block", lat: 22.582384, lng: 88.469596 },
  { name: "Behala 29 Palli", lat: 22.507140, lng: 88.322845 },
  { name: "Behala Adarsha Pally", lat: 22.499845, lng: 88.325141 },
  { name: "Behala Arcadia Sarbojonin", lat: 22.494194, lng: 88.312592 },
  { name: "Behala Buroshibtala Janakalyan Sangha", lat: 22.504251, lng: 88.327821 },
  { name: "Behala Club", lat: 22.504678, lng: 88.313153 },
  { name: "Behala Club Sarbojanin Durgotsar", lat: 22.505260, lng: 88.311506 },
  { name: "Behala Friend's Club", lat: 22.501353, lng: 88.317233 },
  { name: "Behala Natun Sangha", lat: 22.501659, lng: 88.316855 },
  { name: "Behala Nutan Dal", lat: 22.500208, lng: 88.317712 },
  { name: "Behala Panchannantala Mitali Sangha", lat: 22.502669, lng: 88.312177 },
  { name: "Agradut Udaya Sangha", lat: 22.533821, lng: 88.339369 },
  { name: "Behala Sree Sangha", lat: 22.489935, lng: 88.309093 },
  { name: "Behala Youngmen's Association", lat: 22.507329, lng: 88.322282 },
  { name: "Belgachia Sadharan Durgatsab", lat: 22.607732, lng: 88.380164 },
  { name: "Belgachia Sadharon Durgotsav", lat: 22.607732, lng: 88.380164 },
  { name: "Beliaghata 33 No Palli", lat: 22.568569, lng: 88.388553 },
  { name: "Beliaghata Nabamilan", lat: 22.565345, lng: 88.394173 },
  { name: "Bengal United Club", lat: 21.929847, lng: 87.265926 },
  { name: "BH Block", lat: 22.593888, lng: 88.424065 },
  { name: "Bharat Mata", lat: 22.487216, lng: 88.341936 },
  { name: "Bhowanipur 75 Palli", lat: 22.533319, lng: 88.343139 },
  { name: "Bhowanipur Sarbojanin Durgotsav", lat: 22.534992, lng: 88.341269 },
  { name: "Bhowanipur Swadhin Sangha", lat: 22.531932, lng: 88.343832 },
  { name: "Bidhan Sarani Atlas Club", lat: 22.599686, lng: 88.370349 },
  { name: "BJ Block", lat: 22.591030, lng: 88.425855 },
  { name: "BK Block", lat: 22.587364, lng: 88.423819 },
  { name: "BL Block", lat: 22.585470, lng: 88.429860 },
  { name: "Bosepukur Sitala Mandir", lat: 22.519218, lng: 88.382288 },
  { name: "Bosepukur Talbagan", lat: 22.518323, lng: 88.385535 },
  { name: "Briji Unnayan Samity Club", lat: 22.468457, lng: 88.384914 },
  { name: "Brindabon Matri Mandir", lat: 22.582053, lng: 88.370465 },
  { name: "Burmah Shell Colony", lat: 22.698466, lng: 88.383708 },
  { name: "CB Block", lat: 22.588751, lng: 88.398408 },
  { name: "CD Block", lat: 22.570578, lng: 88.334790 },
  { name: "CE Block", lat: 22.594331, lng: 88.412936 },
  { name: "Central Park Mela Ground", lat: 22.587538, lng: 88.419942 },
  { name: "CG Block", lat: 22.655422, lng: 88.866927 },
  { name: "Chakraberia Sarbojanin", lat: 22.533606, lng: 88.349352 },
  { name: "Chaltabagan Durga Puja Pandal", lat: 22.584696, lng: 88.369676 },
  { name: "Chandranath Chatterjee Street", lat: 22.534992, lng: 88.343838 },
  { name: "Chapatala Pally Sarbojanin", lat: 22.570797, lng: 88.367910 },
  { name: "Charer Palli Sarbojanin", lat: 22.617070, lng: 88.387862 },
  { name: "Chelta Sarbasadharaner Club", lat: 22.517313, lng: 88.339937 },
  { name: "Chetla Agrani Club", lat: 22.516400, lng: 88.334267 },
  { name: "Chorbagan Sarbojonin", lat: 22.583428, lng: 88.363597 },
  { name: "CIT Sarbojonin", lat: 22.580890, lng: 88.340857 },
  { name: "College Square", lat: 22.574918, lng: 88.363307 },
  { name: "DA Block", lat: 22.584755, lng: 88.401943 },
  { name: "Dakshin Phalguni Club", lat: 22.470010, lng: 88.380335 },
  { name: "Dakshindari Youth", lat: 22.595300, lng: 88.391280 },
  { name: "Dakshineswar Dolpere", lat: 22.659294, lng: 88.364499 }
];

const filesToCheck = [
    'src/data/pujos-part1.js',
    'src/data/pujos-part2.js',
    'src/data/pujos-part3.js',
    'src/data/pujos-part4.js',
    'src/data/pujo-batch5.js'
];

// In case some names have aliases or slight variations in DB, we'll try exact match first.
// If exact match doesn't work, we'll check if the name is close.
let updatedCount = 0;

for (const file of filesToCheck) {
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    for (const update of updates) {
        const escapedName = update.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Search for EXACT name match
        const nameRegex = new RegExp(`(\\{[^}]*(?:"name"|name)\\s*:\\s*"${escapedName}"[^}]*\\})`, 'g');
        
        let localModified = false;
        content = content.replace(nameRegex, (match) => {
            localModified = true;
            let newMatch = match.replace(/(?:"lat"|lat)\s*:\s*[\d.]+/, `lat: ${update.lat}`);
            newMatch = newMatch.replace(/(?:"lng"|lng)\s*:\s*[\d.]+/, `lng: ${update.lng}`);
            return newMatch;
        });

        if (localModified) {
            modified = true;
            updatedCount++;
            console.log(`Updated ${update.name} in ${file}`);
        }
    }

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
    }
}
console.log(`Batch 100 updates complete! Updated ${updatedCount} pandals.`);
