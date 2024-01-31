
import './Title.css';
import { useState } from "react";



function Title() {


    const [showInput, setShowInput] = useState(false);
    const [inputTitleValue, setInputTitleValue] = useState(['']);
    const [title, setTitle] = useState('title');

    const handleTitleClick = () => {
        setShowInput(true);
    }

    const handleInputTitleChange = (event) => {

        setInputTitleValue(event.target.value);
    }

    const handleInputTitleKeyDown = (event) => {

        if (event.key === 'Enter') {
            setTitle(inputTitleValue);
            setShowInput(false);
        }
    }


    return (

        <div>

            {!showInput && < h2 className="title-button" onClick={handleTitleClick}>{title}</h2>}

            {/* {TitleButton && < button className="title-button" onClick={handleTitleClick}>title</button>} */}
            {showInput && <input type="text" id="title" className="title-box" placeholder="Enter your title"
                value={inputTitleValue} onChange={handleInputTitleChange} onKeyDown={handleInputTitleKeyDown} />}



        </div>);

}



export default Title;












