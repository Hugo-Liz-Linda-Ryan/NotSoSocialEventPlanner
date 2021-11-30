import "./About.css";


const About = () => {
  return (
    <section id="aboutSection">
      <div className="aboutSectionWrapper">
        <div className="aboutTheApp">
          <h2>About the App</h2>
          <p>
            The Not So Social Planner was created by aspiring front-end web
            developers Hugo Arriojas, Linda Columbus, Elizabeth Harris and Ryan
            Van Den Eeckhout during the 2021 Fall-Winter bootcamp at Juno
            College of Technology. Not So Social Planner uses CSS, JavaScript,
            React and HTML5 in its code makeup. The project was built to
            showcase the collaborative efforts of the four students during an
            agency style pair programming project that integrates the use of a
            REST API and Firebase during the period.
          </p>
          <h2>What Can the App do?</h2>
          <p>
            The API data for the Not So Social Planner app was supplied by
            TVMaze API which supplies data on a variety of movies from around
            the world. Additionally, through the use of Firebase the User can
            create and plan for their next week using the Not So Social Event
            Planner Section of the APP. Furthermore, this project supports the
            looking up of these movies under the categories to help you in the
            pursuit of the perfect night whether you go out or stay in the APP
            is tailored around you!
          </p>
        </div>

        <div className="aboutTheDevs">
          <div className="appTagLine">
            <img src="" id="roundimage" alt="Profile Pic" />
            <h3>
              Ryan Van Den Eeckhout is an aspiring Front end Web Developer
              further works by this developer can be found at portfilio name
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
