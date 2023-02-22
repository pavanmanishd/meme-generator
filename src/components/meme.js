import React from 'react';
import html2canvas from 'html2canvas';
function Meme(){
    
    const [meme, setMeme] = React.useState({
        topText : "",
        bottomText : "",
        ImageUrl : "https://i.imgflip.com/3lmzyx.jpg",
        ImageName : " "
    })
    const [allMemes,setAllMemes] = React.useState([])
    // console.log(allMemes)
    
    
    React.useEffect(function(){
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    },[])
    
    const options = allMemes.map(item => {
        return(
            <option value={item.name} key={item.id} >{item.name}</option>
        )
    })


    function getMemeImage(event){
        let url = ""
        if(event._reactName === "onClick"){
            setMeme(prevMeme => ({
                ...prevMeme,
                ImageName : " "
            }))
        }
        if(meme.ImageName === " "){
            const memesArray = allMemes;
            const randomNumber = Math.floor(Math.random() * memesArray.length);
            url = memesArray[randomNumber].url;
        }
        else{
            allMemes.map(item => {
                if(meme.ImageName === item.name){
                    url = item.url
                    // console.log(item.name)
                }
                return item
            })
            setMeme(prevMeme => ({
                ...prevMeme,
                ImageUrl : url
            }))
        }
        // console.log(url)
        setMeme(prevMeme => ({
            ...prevMeme,
            ImageUrl : url
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
        if(name == "ImageName") getMemeImage("onChange");
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
            <button onClick={getMemeImage} className='button'>Get a Random Meme</button>
            <label htmlFor="select-image">Choose Image Template :</label>
            <select 
                id="select-image"
                className="select-option"
                value={meme.ImageName} 
                onChange={handleChange}
                name="ImageName"
            >
                <option value=" ">--Choose a Template--if not choosen you get a random image--</option>
                {options}
            </select>
            <div className='meme' id='meme'>
                <img src={meme.ImageUrl} alt='meme-img' className="meme-image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
            <a id='download'  download="image.png" ><button className='button' onClick={download}>Download</button></a>
        </main>
    );
    
}

export default Meme;