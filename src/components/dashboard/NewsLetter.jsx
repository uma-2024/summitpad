import React from "react";

const NewsLetter = () => {
    return (
        <div className="news-letter-main-flex mt-20 mb-20">
            <div>
                <h2 className="news-letter-heading md:text-2xl text-2xl">our newsletter</h2>
                {/* <p className="news-letter-para">Stay ahead in crypto with Summit! Join our newsletter for updates on upcoming IDOs, exclusive token allocations, and the latest blockchain innovations. Don’t miss your chance to invest early!</p> */}
            </div>
            <div>
                <div className="news-letter-inp-box">
                    <div className="news-letter-inp-wrapper">
                        <input className="news-letter-inp outline-none text-white" type="text" placeholder="Subscribe" />
                    </div>
                    <button className="d-hero-g-btn">Get Started</button>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter;