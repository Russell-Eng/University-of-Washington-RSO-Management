import React from "react";

export function AboutUsPage() {
    return (
        <div className="about">
            <h1>About us</h1>
            <br />
            <div className="about-us">
                <img src="img/uw-cherry.jpg" alt="cherry blossoms at university of washington" />
                <p>
                    For UW students, it is considered an important part of college life to participate in RSO events.
                    However, with over a thousand RSOs that are currently loosely connected, UW students may have difficulty in
                    exploring new RSOs and events, spending much time on searching for information inefficiently. Therefore,
                    in order to provide our community with a more integrated space of RSO info, we constructed a website that
                    can work better than Husky Link in terms of uploading, browsing, and tagging events.
                </p>

                <p>
                    This website is an open platform for all UW registered student organizations, or "RSO" for short,
                    to introduce themselves and their events to the whole UW community. It is also a great source of information
                    for UW students who are interested in joining new RSOs and participating in events.
                    Interests and passions are more than welcome!
                </p>
                <br />

                <p id="title">User Guide</p>
                <div className="br-card">
                    <div className="container">
                        <p id="role">For Regular Browsers</p>
                        <p id="exp">
                            1. On the homepage, you are able to search for events by typing keywords or directly browse
                            events displayed in the banners on top and cards down below.
                            <br />
                            <br />
                            2. Click on the cards for more information regarding specific events in which you are interested.
                            <br />
                            <br />
                            3. Check out the images and text descriptions of the event posted by the responsible RSO.
                            <br />
                            <br />
                            4. Click on the RSO icon to view its profile, where a more detailed description of this organization
                            as well as its recently scheduled events are recorded.
                        </p>
                    </div>
                </div>

                <div className="br-card">
                    <div className="container">
                        <p id="role">For RSOs</p>
                        <p id="exp">
                            1. In order to join this platform, you can click on the "Sign In" button on the top right corner
                            of the homepage, then sign up an account using an email address. As a newly registered RSO, fill in
                            your name, a detailed description, and an official icon to generate a profile page that can be browsed
                            by other interested students.
                            <br />
                            <br />
                            2. Start setting up events through your profile page by click on the plus button next to "Events".
                            In the following page, upload images related to your event, then enter its name, scheduled time span,
                            and also a description in detail.
                            <br />
                            <br />
                            3. Submit your event once everything is finalized, and click on "Sign Out" on the top right corner
                            when you finish all your work.
                        </p>
                    </div>
                </div>

                <div className="hp-links">
                    <p>Learn more about how to found and develop your RSO from the very beginning:</p>
                    <a href="https://hub.washington.edu/get-involved/sao/rso-registration/"
                        target="_blank">
                        How To Register A Registered Student Organization(RSO)
                    </a>
                    <br />
                    <a href="https://hub.washington.edu/get-involved/sao/rso-benefits-training-policies
                    /rso-policy-guide/registration-requirements/" target="_blank">
                        Registration Requirements, RSO Policy Guide
                    </a>
                    <br />
                    <a href="https://hub.washington.edu/get-involved/sao/rso-benefits-training-policies
                    /rso-benefits-resources/" target="_blank">
                        RSO Benefits & Resources
                    </a>
                </div>

            </div>
        </div>
    )
}