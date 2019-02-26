// Home.js

import React, { Component } from "react";
import Slider from "react-slick";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <a className="carousel-control-prev" href="#part" onClick={onClick}>
      <i className="fa fa-chevron-left" aria-hidden="true" />
    </a>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <a className="carousel-control-next" href="#part" onClick={onClick}>
      <i className="fa fa-chevron-right" aria-hidden="true" />
    </a>
  );
}

export default class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    var settings = {
      autoplay: true,
      autoplaySpeed: 10000,
      arrows: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };
    const settingss = {
      autoplay: true,
      autoplaySpeed: 10000,
      customPaging: function(i) {
        return <a />;
      },
      fade: true,
      dots: true,
      dotsClass: "carousel-indicators"
    };
    return (
      <main>
        <section className="hero-banner">
          <div className="container">
            <div className="modal-wrap">
              <div className="modal-table">
                <div className="modal-cell">
                  <div className="homebanner-info">
                    <h2>
                      Step into
                      <br />a world of
                      <br />
                      opportunities!
                    </h2>
                    <a href="#" className="btn">
                      Learn
                    </a>
                    <a href="#" className="btn">
                      Grow
                    </a>
                    <a href="#" className="btn">
                      Partner
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="start-explore-wpr pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 exp-left">
                <img src="/images/college-home-explore.png" />
              </div>
              <div className="col-lg-9 exp-right">
                <div className="title">
                  <h2>
                    <span>Start </span> Exploring Today
                  </h2>
                </div>
                <div className="row home-explore-info pad-40-t">
                  <div className="col-md-6">
                    <div className="home-explore-box">
                      <div className="icon-box">
                        <img src="/images/icon-1.png" />
                      </div>
                      <div className="info-box">
                        <h3>The Jobs of the Future</h3>
                        <p>
                          Sollers bridges the gap between the theory and the
                          applied skills required in the workplace
                        </p>
                        <a href="#">Learn More</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="home-explore-box">
                      <div className="icon-box">
                        <img src="/images/icon-2.png" />
                      </div>
                      <div className="info-box">
                        <h3>DON'T PAY UNTIL YOU PLAY</h3>
                        <p>
                          Our innovative income-sharing program means you may
                          not have to pay tuition until after you've secured a
                          decent job.
                        </p>
                        <a href="#">Admissions</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="home-explore-box">
                      <div className="icon-box">
                        <img src="/images/icon-3.png" />
                      </div>
                      <div className="info-box">
                        <h3>GUIDING PRINCIPLES</h3>
                        <p>
                          "The Sollers 7" is a blueprint for what we do and who
                          we are.
                        </p>
                        <a href="/about-us">About Us</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="home-explore-box">
                      <div className="icon-box">
                        <img src="/images/icon-4.png" />
                      </div>
                      <div className="info-box">
                        <h3>TAKE THE FIRST STEP</h3>
                        <p>
                          Your journey starts with a single step. Will you step
                          forward to transform your life?
                        </p>
                        <a href="#">Talk to Us</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="learn-interest-wpr pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="learn-interest-inner-wpr">
                  <div className="learn-interest-inner-box">
                    <div className="learn-interest-info pad-70-all">
                      <div className="title">
                        <h2>
                          <span>A unique learning </span>Experience
                        </h2>
                      </div>
                      <p>
                        Sollers College graduates move on to outstanding careers
                        in the Life Sciences, gaining employment among industry
                        leaders, such as Bristol-Myers Squibb and Pfizer.
                      </p>
                      <a href="#" className="btn btn-ghost btn-black-bg">
                        About Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="where-do-wpr pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <img src="/images/graduate-img.jpg" />
              </div>
              <div className="col-lg-6">
                <div className="graduate-wpr-rt">
                  <div className="title">
                    <h2>
                      <span>Where do </span> Our graduates go?
                    </h2>
                  </div>
                  <p>
                    Sollers College graduates move on to outstanding careers in
                    the pharmaceutical and medical fields, gaining employment
                    among industry leaders, such as Bristol- Myers Squibb and
                    Pfizer. Our Career Development Office supports our students
                    as they advance in their careers by providing counseling and
                    advice on choosing the program best suited to their
                    ambitions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="future-wpr future-wpr-hm pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="testimonial_outer">
                  <div id="demo">
                    <div className="carousel-inner">
                      <Slider {...settingss}>
                        <div className="carousel-item">
                          <div className="slide-content">
                            <div className="title">
                              <h2>
                                <span>Listen to </span> Your future{" "}
                              </h2>
                            </div>
                            <p className="main center">
                              "Sollers College provides strategic sourcing and
                              subject matter expertise to tackle a variety of
                              complex functions for the pharmaceutical industry.
                              I chose Sollers for a number of reasons. The
                              school provides a hybrid learning format where
                              students can attend classes in person or online
                              via internet."
                            </p>
                            <p className="sub center">
                              Their staff is well trained with broad skill sets
                              that range from Drug Safety/Pharmacovigilance,
                              Clinical Trial Management, Clinical Research,
                              Oracle Argus safety database, and Statistical
                              Analysis System (SAS). Staff and faculty members
                              are accessible and willing to give students advice
                              about their professional questions and concerns. I
                              plan to work at a pharmaceutical company or
                              contract research organization as a
                              pharmacovigilance scientist. I am looking forward
                              to my future career thanks to the skills and
                              professional network that Sollers College has
                              helped me build.
                            </p>
                            <div className="table">
                              <div className="cell right">
                                <strong>Dr. Aziz ur Rehman, M.D</strong>
                                <span>Clinical Safety Scientist</span>
                              </div>
                              <div className="cell">
                                <figure>
                                  <img
                                    className="rounded"
                                    src="/images/paul-nielsen.jpg"
                                    alt="testimonial"
                                  />
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="slide-content">
                            <div className="title">
                              <h2>
                                <span>Listen to </span> Your future{" "}
                              </h2>
                            </div>
                            <p className="main center">
                              "Sollers College provides strategic sourcing and
                              subject matter expertise to tackle a variety of
                              complex functions for the pharmaceutical industry.
                              I chose Sollers for a number of reasons. The
                              school provides a hybrid learning format where
                              students can attend classes in person or online
                              via internet."
                            </p>
                            <p className="sub center">
                              Their staff is well trained with broad skill sets
                              that range from Drug Safety/Pharmacovigilance,
                              Clinical Trial Management, Clinical Research,
                              Oracle Argus safety database, and Statistical
                              Analysis System (SAS). Staff and faculty members
                              are accessible and willing to give students advice
                              about their professional questions and concerns. I
                              plan to work at a pharmaceutical company or
                              contract research organization as a
                              pharmacovigilance scientist. I am looking forward
                              to my future career thanks to the skills and
                              professional network that Sollers College has
                              helped me build.
                            </p>
                            <div className="table">
                              <div className="cell right">
                                <strong>Dr. Aziz ur Rehman, M.D</strong>
                                <span>Clinical Safety Scientist</span>
                              </div>
                              <div className="cell">
                                <figure>
                                  <img
                                    className="rounded"
                                    src="/images/paul-nielsen.jpg"
                                    alt="testimonial"
                                  />
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="carousel-item">
                          <div className="slide-content">
                            <div className="title">
                              <h2>
                                <span>Listen to </span> Your future{" "}
                              </h2>
                            </div>
                            <p className="main center">
                              "Sollers College provides strategic sourcing and
                              subject matter expertise to tackle a variety of
                              complex functions for the pharmaceutical industry.
                              I chose Sollers for a number of reasons. The
                              school provides a hybrid learning format where
                              students can attend classes in person or online
                              via internet."
                            </p>
                            <p className="sub center">
                              Their staff is well trained with broad skill sets
                              that range from Drug Safety/Pharmacovigilance,
                              Clinical Trial Management, Clinical Research,
                              Oracle Argus safety database, and Statistical
                              Analysis System (SAS). Staff and faculty members
                              are accessible and willing to give students advice
                              about their professional questions and concerns. I
                              plan to work at a pharmaceutical company or
                              contract research organization as a
                              pharmacovigilance scientist. I am looking forward
                              to my future career thanks to the skills and
                              professional network that Sollers College has
                              helped me build.
                            </p>
                            <div className="table">
                              <div className="cell right">
                                <strong>Dr. Aziz ur Rehman, M.D</strong>
                                <span>Clinical Safety Scientist</span>
                              </div>
                              <div className="cell">
                                <figure>
                                  <img
                                    className="rounded"
                                    src="/images/paul-nielsen.jpg"
                                    alt="testimonial"
                                  />
                                </figure>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Slider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="ch-part pad-70-tb">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div id="part">
                  <div className="carousel-inner">
                    <Slider {...settings}>
                      <div className="carousel-item">
                        <div className="slide-content">
                          <div className="title">
                            <h2>
                              <span>Academic</span>Partners
                            </h2>
                          </div>
                          <div className="text_main">
                            <p>
                              For almost a decade, we have partnered with other
                              universities and colleges to deliver programs and
                              courses in the areas of clinical research, data
                              science, and drug safety. These relationships are
                              designed to seamlessly support the academic
                              success of students while allowing our academic
                              partners to enjoy the unique benefits of our
                              experience developing more than 1,500 hours of
                              curriculum in these specialized areas.
                            </p>
                            <p style={{ paddingTop: "0px" }}>
                              By working with Sollers College, our partners are
                              able to quickly and easily add new programs and
                              courses to their catalog of offerings without the
                              typical risks and costs associated with their
                              development and launch. We provide the resources
                              and manage the programs, from content and lecture
                              delivery to ensuring satisfactory student academic
                              progress and evaluation, freeing our partners to
                              focus on other areas of their business.{" "}
                            </p>
                          </div>
                          <div className="container">
                            <div className="row">
                              <div className="col-sm-6 part_sec">
                                <strong>
                                  New York Academy of Sciences, NY
                                </strong>
                                <p>
                                  Sollers College and the New York Academy of
                                  Sciences (NYAS) joined forces to introduce
                                  courses in the rapidly-growing clinical
                                  research management domain to life science
                                  professionals possessing a graduate degree or
                                  Ph.D. Those students who have completed the
                                  clinical program have moved on to valuable
                                  careers in the life sciences industry. Due to
                                  the course’s success, NYAS and Sollers are
                                  adding additional courses to NYAS catalog.
                                </p>
                                <img
                                  src="/images/the-newyork.jpg"
                                  alt="he New York Academy of Sciences"
                                />
                              </div>
                              <div className="col-sm-6 part_sec">
                                <strong>
                                  Carnegie Mellon University Software
                                  Engineering Institute (SEI), PA
                                </strong>
                                <p>
                                  The Software Engineering Institute at Carnegie
                                  Mellon University is a federally-funded
                                  research and development center, sponsored by
                                  the U.S. Department of Defense and operated by
                                  Carnegie Mellon University. We have partnered
                                  with SEI to offer coursework in information
                                  security, software architecture, software
                                  engineering measurement and analysis, and the
                                  team software process (TSP).{" "}
                                </p>
                                <img
                                  src="/images/the-newyork.jpg"
                                  alt="he New York Academy of Sciences"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="slide-content">
                          <div className="title">
                            <h2>
                              <span>Corporate</span>Training
                            </h2>
                          </div>
                          <div className="text_main">
                            <p>
                              For almost a decade, we have partnered with other
                              universities and colleges to deliver programs and
                              courses in the areas of clinical research, data
                              science, and drug safety. These relationships are
                              designed to seamlessly support the academic
                              success of students while allowing our academic
                              partners to enjoy the unique benefits of our
                              experience developing more than 1,500 hours of
                              curriculum in these specialized areas.
                            </p>
                            <p style={{ paddingTop: "0px" }}>
                              By working with Sollers College, our partners are
                              able to quickly and easily add new programs and
                              courses to their catalog of offerings without the
                              typical risks and costs associated with their
                              development and launch. We provide the resources
                              and manage the programs, from content and lecture
                              delivery to ensuring satisfactory student academic
                              progress and evaluation, freeing our partners to
                              focus on other areas of their business.{" "}
                            </p>
                          </div>
                          <div className="container">
                            <div className="row">
                              <div className="col-sm-6 col-lg-4 training_sec">
                                <img src="/images/oracle.png" />
                                <ul>
                                  <li>Argus Safety</li>
                                  <li>Argus Insight</li>
                                  <li>Empirica</li>
                                  <li>Oracle Clinical</li>
                                </ul>
                              </div>
                              <div className="col-sm-6 col-lg-4 training_sec">
                                <img src="/images/mc-logo-1.png" />
                                <ul>
                                  <li>eTrial Master File</li>
                                </ul>
                              </div>
                              <div className="col-sm-6 col-lg-4 training_sec">
                                <img
                                  src="/images/bio-logo.png"
                                  alt="he New York Academy of Sciences"
                                />
                                <ul>
                                  <li>Clinical Trial Monitoring System</li>
                                </ul>
                              </div>
                              <div className="col-sm-6 col-lg-4 training_sec">
                                <img src="/images/cyntegrity-1.png" />
                                <ul>
                                  <li>Risk-Based Monitoring</li>
                                </ul>
                              </div>
                              <div className="col-sm-6 col-lg-4 training_sec">
                                <img src="/images/sas.png" />
                                <ul>
                                  <li>
                                    SAS certified, with SAS and JMP Clinical
                                  </li>
                                </ul>
                              </div>
                              <div className="col-sm-6 col-lg-4 training_sec">
                                <img
                                  src="/images/tableau.png"
                                  alt="he New York Academy of Sciences"
                                />
                                <ul>
                                  <li>Visualization Tools</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="slide-content">
                          <div className="title">
                            <h2>
                              <span>Listen to </span> Your future{" "}
                            </h2>
                          </div>
                          <div className="main">
                            <p>
                              Sollers has extensive expertise in developing
                              employee education and advancement for our
                              corporate partners in the life science domain. We
                              provide comprehensive services for the clinical
                              research and drug safety industries. Custom
                              training is designed to meet each corporate
                              partner’s unique business needs and is led by our
                              skilled in-house experts. Our effective, relevant
                              curriculum meets our partners’ exacting standards
                              for content and delivery, bringing together
                              people, processes, and systems for optimal student
                              success.
                            </p>
                            <p style={{ paddingTop: "0px" }}>
                              <img src="/images/Hoffmann-La_Roche_logo.png" />
                            </p>
                            <p style={{ paddingTop: "0px" }}>
                              When Hoffman-LaRoche was restructuring in 2012,
                              the company made the difficult decision to close
                              their operations in Nutley, NJ. A number of
                              employees in their pre-clinical and R&amp;D
                              operations were made redundant but possessed the
                              requisite skills and experience to effectively
                              transition into clinical research. A number of the
                              impacted employees contacted Sollers for
                              retraining, and so we approached LaRoche about
                              developing a customized solution for transitioning
                              affected employees into their translational
                              sciences division. LaRoche agreed and Sollers
                              trained approximately 50 employees, successfully
                              preparing them for their transition and allowing
                              them to remain employed with the organization.
                            </p>
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
