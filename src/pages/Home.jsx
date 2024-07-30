import FeatureItem from '../component/FeatureItem';
import Footer from '../component/Footer';
import Header from '../component/Header';

import "../style/Home.scss"

function Home() {
    return(
        <div className="home">
            <Header/>
            <main>
                <section className='content1'>
                    <div className="text-box">
                        <p className="subtitle">No fees.</p>
                        <p className="subtitle">No minimum deposit.</p>
                        <p className="subtitle">High interest rates.</p>
                        <p className='text'>Open a savings account with Argent Bank today!</p>
                    </div>
                </section>
                <section className='content2'>
                    <FeatureItem src="./img/icon-chat.png" title="You are our #1 priority" description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes. "/>
                    <FeatureItem src="./img/icon-money.png" title="More savings means higher rates" description="The more you save with us, the higher your interest rate will be!"/>
                    <FeatureItem src="./img/icon-security.png" title="Security you can trust" description="We use top of the line encryption to make sure your data and money is always safe."/>
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Home;