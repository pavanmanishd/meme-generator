import React from 'react';
import html2canvas from 'html2canvas';
// import memesData from "../memesData.js";
function Meme(){
    // const [memeImage,setMemeImage] = React.useState("https://i.imgflip.com/3lmzyx.jpg")
    
    const [meme, setMeme] = React.useState({
        topText : "",
        bottomText : "",
        randomImage : "https://i.imgflip.com/3lmzyx.jpg"
    })
    
    const [allMemes,setAllMemes] = React.useState([])
    
    
    React.useEffect(function(){
        console.log("Effect used")
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    },[])

    // OR

    // React.useEffect(() => {
    //     async function getMemes(){
    //         const res = await fetch("https://api.imgflip.com/get_memes")
    //         const data = await res.json()
    //         setAllMemes(data.data.memes)
    //     }
    //     getMemes()
    // },[])




    function getMemeImage(){
        const memesArray = allMemes;
        const randomNumber = Math.floor(Math.random() * memesArray.length);
        const url = memesArray[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage : url
        }))
        
    }

    function handleChange(event) {
        const {name,value} = event.target
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                [name] : value
            }
        })
    }
    
    function handleSubmit(){
        console.log(meme)
    }

    function download(){
        html2canvas(document.getElementById("meme"),{
            allowTaint: true,
            useCORS: true
        }).then(canvas => {
            var download = document.getElementById("download")
            var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
            download.setAttribute("href", image)
            download.click()
            download.removeAttribute("href")
        })   
    }
    
    return(
        <main className="main-block">
            <form className="input" onSubmit={handleSubmit}>
                <input 
                    type='text' 
                    className="input-1" 
                    placeholder="Top Text" 
                    onChange={handleChange}
                    name="topText"
                    value={meme.topText}
                    />
                <input 
                    type='text' 
                    className="input-2" 
                    placeholder="Bottom Text" 
                    onChange={handleChange}
                    name="bottomText"
                    value={meme.bottomText}
                    />
            </form>
            <button onClick={getMemeImage} className='button'>Get a new Meme</button>
            <div className='meme' id='meme'>
                <img src={meme.randomImage} alt='meme-img' className="meme-image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <a id='download'  download="image.png" ><button className='button' onClick={download}>Download</button></a>
        </main>
    );
    
}

export default Meme;