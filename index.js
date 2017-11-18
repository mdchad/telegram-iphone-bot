const scrapeIt = require('scrape-it')

let getValue = function () {
    return scrapeIt("https://www.m1.com.sg/micro/iphone/stock", {
    // Fetch all the data
        stock: {
            listItem: "td"
        }
    })
    .then(page => {
        if (page) {
            let newData = page.stock.filter(obj => {
                return typeof obj === 'string' && obj !== 'iPhone X, 64GB' && obj !== 'iPhone X, 256GB' && obj !== 'Space Gray' && obj !== 'Silver'
            })

            for (let i = 0; i < newData.length; i++) {
                if (newData[i] === '–') {
                    newData[i] = 'Not available'
                }
            }
            
            const stuffs = newData.reduce((acc, item, index) => { 
                if (index < 11) { 
                    acc[0].push(item); 
                } 
                else if (index > 10 && index < 22) { 
                    acc[1].push(item); 
                } 
                else if (index > 21 && index < 33) { 
                    acc[2].push(item);
                } 
                else if (index > 32 && index < 44) { 
                    acc[3].push(item); 
                    } 
                else { 
                    acc[4].push(item); 
                } return acc; 
            }, [[],[],[],[],[]]);
            
            return stuffs[0].map((loc, index) => 
                ({
                    location: loc, 
                        iphone64gb: {
                            spaceGrey: stuffs[1][index],
                            silver: stuffs[2][index]
                        },
                        iphone256gb: {
                            spaceGrey: stuffs[3][index],
                            silver: stuffs[4][index]
                        }
                })
            )
        }
    })
    .catch(err => {
        throw err
    })
}

module.exports = getValue