import "../stylesheets/About.css";

const About = () => {

  const devItems = [
    {
        devname:'Linda Columbus',
        paragraph: '',
        url: './devicons/bunnyBrown.png',
        website: 'https://www.lindacolumbus.ca' ,
        github: 'https://github.com/lindacolumbus'
    },
    {
        devname:'Hugo Arriojas',
        paragraph: '',
        url: './devicons/cat.png',
        website: 'https://www.hugoa.dev/' ,
        github: 'https://www.github.com/HugoArriojas'
    },    
    {
        devname:'Elizabeth Harris',
        paragraph: '',
        url: './devicons/bunnyBlack.png',
        website: 'https://www.elizabethharris.dev' ,
        github: 'https://github.com/lizzy-bird'
    }
];

  return (
    <section className="aboutSection" id="aboutSection">
      <div className="aboutSectionWrapper">
        <div className="aboutTheApp">
          <h3 className="aboutIntro">About the App</h3>
          <p>The Not So Social Planner was created by aspiring front-end web developers Hugo Arriojas, Linda Columbus, and Elizabeth Harris during the 2021 Fall-Winter bootcamp at Juno College of Technology. Not So Social Planner uses CSS, JavaScript, React and HTML5 in its code makeup. The project was built to showcase the collaborative efforts of the three students during an agency style project that integrates the use of a REST API and Firebase during the period.</p>
          
          <h3>What Can the App do?</h3>
          <p>The API data for the Not So Social Planner app was supplied by TVMaze API which supplies data on a variety of movies from around
          the world. Additionally, through the use of Firebase the User can create and plan for their next week using the Not So Social Event
          Planner Section of the APP. Furthermore, this project supports the looking up of these movies under the categories to help you in the pursuit of the perfect night whether you go out or stay in the APP is tailored around you!</p>
        </div>

        <div className="aboutTheDevs">
          <h2>Dev Team</h2>
          {devItems.map((item, index) => {
            return (
              <div className="appTagLine" key={index}>
                <img src={item.url} className="roundImage" alt="Profile Pic" />                
                <div className="paraAboutContainer">
                  <h3 className="devNames">{item.devname}</h3>
                  <h4><a href={item.website}>Website</a></h4>
                  <h4><a href={item.github}>Github</a></h4>
                </div>
              </div>
            
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
