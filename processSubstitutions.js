var fs = require('fs');
var path = require('path');

var substitutions = require('./1/substitutes.json');
var caseLookup = createCaseLookup();
var correctedSubstitutions = substitutions.map(sub => {
  return sub.filter(x => caseLookup.has(x.toLowerCase()))
    .map(related => caseLookup.get(related.toLowerCase()))
})
var fileNames = getFileNames();

var substitutionsByLetter = indexSubstitutionsByLetter(correctedSubstitutions);
console.log(substitutionsByLetter);

substitutionsByLetter.forEach((subreddits, letter) => {
  let file = getFileContentForLetter(letter);
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

function getFileContentForLetter(letter) {
  const fullName = path.join(__dirname, '1', fileNames.get(letter));
  const result = {
    name: fileNames.get(letter),
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

function indexSubstitutionsByLetter(subs) {
  const subByLetter = new Map(); // maps first sub reddit to map of reddits to replace
  subs.forEach(row => {
    const subreddit = row[0];
    let firstLetter = subreddit[0].toLowerCase(); 
    let subs =subByLetter.get(firstLetter);
    if (!subs) {
      subs = new Map(); // subreddit name => list of subreddits.
      subByLetter.set(firstLetter, subs);
    }
    subs.set(subreddit, row);
  });
  return subByLetter;
}

function getFileNames() {
  let fileNamesIndex = new Map();
[
  '0_z0123456789jqx.json', '10_m.json', '11_l.json', '12_i.json', '13_h.json', '14_g.json', '15_f.json', '16_e.json', '17_d.json', '18_c.json', '19_b.json', '1_yk.json', '20_a.json', '2_w.json', '3_vo.json', '4_u.json', '5_t.json', '6_s.json', '7_r.json', '8_p.json', '9_n.json'
].forEach(name => {
    const fileName = name.replace(/^\d\d?_/, '').replace(/\.json$/, '');
    for (var i = 0; i < fileName.length; ++i) {
      let letter = fileName[i];
      fileNamesIndex.set(letter, name);
    }
  });
  return fileNamesIndex;
}