// response.clone is used to simply clone the data
// text convert the respone in proper text
// here fetching the site contains html which is not json format so .json gives error
const fun = async(link)=>{
    const data = await fetch(link)
    console.log(data)
    const responseClone = await data.clone();
    console.log(await responseClone.text())
    // const dataInJosn = await data.json();
    // console.log(dataInJosn)
}


// here localhost contains cookies null while google contains cookies
const main = async()=>{
    console.log('---')
    await fun('http://localhost:3000/')
    console.log('---')
    await fun('https://www.google.com/')
    console.log('---')   
}

main()