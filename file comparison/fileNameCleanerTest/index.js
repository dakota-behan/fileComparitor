const fs = require("fs");
const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let createCheckFunc = (path1, path2) => () => {
  let whatOneHasThatTwoNeeds = []
  let viceVersa = []
  let dir1 = fs.readdirSync(path1)
  let dir2 = fs.readdirSync(path2)
  for (let i = 0; i < dir1.length; i++) {
    let isIn = true
    for (let j = 0; j < dir2.length; j++) {
      if (dir1[i] == dir2[j]) {
        isIn = false
      }
    }
    if (isIn) {
      whatOneHasThatTwoNeeds.push(dir1[i])
    }
  }
  for (let i = 0; i < dir2.length; i++) {
    let isIn = true
    for (let j = 0; j < dir1.length; j++) {
      if (dir2[i] == dir1[j]) {
        isIn = false
      }
    }
    if (isIn) {
      viceVersa.push(dir2[i])
    }
  }
  console.log(`\npath ${path2} is missing:\n\t-${whatOneHasThatTwoNeeds.sort().join('\n\t-')}\n\n path ${path1} is missing:\n\t-${viceVersa.sort().join('\n\t-')}`)
  return
}
rl.question('is this X:/Games and Y:/Games?', ans0 => {
  if (ans0[0].toLowerCase() == 'y') {
    let ans1 = 'X:/Games'
    let ans2 = 'Y:/Games'
    let theCheck = createCheckFunc(ans1, ans2)
    theCheck()
    let recursiveCheck = () => {
      rl.question('do you want to check again?\n', ans => {
        if (ans && ans[0].toLowerCase() === 'n') {
          console.log('goodbye!')
            (() => {
              setTimeout(() => {
                return
              }, 1000);

            })
        } else {
          theCheck()
          recursiveCheck()
        }
      })
    }
    recursiveCheck(ans1, ans2)
  } else {
    rl.question('what is first filepath\n', ans1 => {
      rl.question('what is the second filepath\n', ans2 => {
        let theCheck = createCheckFunc(ans1, ans2)
        theCheck()
        let recursiveCheck = () => {
          rl.question('do you want to check again?\n', ans => {
            if (ans && ans[0].toLowerCase() === 'n') {
              console.log('goodbye!')
                (() => {
                  setTimeout(() => {
                    return
                  }, 1000);

                })
            } else {
              theCheck()
              recursiveCheck()
            }
          })
        }
        recursiveCheck()
      })
    })
  }
})