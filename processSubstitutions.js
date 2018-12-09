var fs = require('fs');
var path = require('path');

var substitutions = require('./1/substitutes.json');
var caseLookup = createCaseLookup();

var subreddits = new Map();
substitutions.forEach(sub => {
  const subWith = sub.filter(x => caseLookup.has(x.toLowerCase()))
    .map(related => caseLookup.get(related.toLowerCase()))
  
  subreddits.set(subWith[0], subWith);
})
var fileNames = getFileNames();

fileNames.forEach(fileName => {
  let file = getFileContent(fileName);
  let out = [];
  file.content.forEach(row => {
    const subName = row[0];
    const replacement = subreddits.get(subName);
    if (replacement) {
      out.push(replacement);
    } else {
      out.push(row);
    }
  });

  fs.writeFileSync(path.join(__dirname, 'out', file.name), JSON.stringify(out), 'utf8');
});

function getFileContent(fileName) {
  const fullName = path.join(__dirname, '1', fileName);
  const result = {
    name: fileName,
    content: require(fullName)
  };
  return result;
}

function createCaseLookup() {
  var counts = require('./1/count_low_threshold.json');
  const lowerCaseToRealCase = new Map();
  counts.forEach(band => {
    band.forEach(sub => {
      lowerCaseToRealCase.set(sub.toLowerCase(), sub);
    })
  })
  return lowerCaseToRealCase;
}

function getFileNames() {
  return [
    '0_z0123456789jqx.json', '10_m.json', '11_l.json', '12_i.json', '13_h.json', '14_g.json', '15_f.json', '16_e.json', '17_d.json', '18_c.json', '19_b.json', '1_yk.json', '20_a.json', '2_w.json', '3_vo.json', '4_u.json', '5_t.json', '6_s.json', '7_r.json', '8_p.json', '9_n.json'
  ];
}