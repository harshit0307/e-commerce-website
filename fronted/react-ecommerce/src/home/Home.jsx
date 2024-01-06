import React from "react"
import Banner from "./Banner"
import HomeCategory from "./HomeCategory"
import CategoryShow from "./CategoryShow"
import Register from "./Register"
import LocationSprade from "./LocationSprade"
import AboutUs from "./AboutUs"
import AppSection from "./AppSection"
import Sponsor from "./Sponsor"

const Home = () => {
    return (
        <div>
            <Banner />
            <HomeCategory />
            <CategoryShow />
            <Register />
            <LocationSprade />
            <AboutUs />
            <AppSection />
            <Sponsor />
        </div>
    )
}

export default Home