import React from 'react';
function Home() {
    return (
        <div className="container">
            <br></br>
            <div className="container">
                <div className="row row-header">
                    <div className="col-12">
                        <h1>Introduction</h1>
                        <p>
                            The term “Swarm Intelligence” is the collective behavior of a
                            combination of many simple individuals, where they operate
                            autonomously. “Swarm Robotics” is the application of swarm
                            intelligence used in collective robotics. This has been a new
                            approach to the coordination of mass of robots that are
                            capable of local communication, decentralized controlling,
                            autonomous and also operations based on biological inspiration
                            senses. In order to achieve the highest effectiveness of swarm
                            robotics applications, virtual reality has been used.<br></br>
                            <br></br>
                            Mixed Reality (MR) was originally derived from Virtual Reality
                            (VR). When designing MR systems, users are provided with the
                            illusion that digital objects are in the same space as
                            physical ones. Mixed Reality is typically correlated with
                            Virtual Reality by the solutions that have been made to
                            address the problems related to robotic applications. However,
                            the use of MR was clearly identified as very useful from just
                            only VR implementations by its flexibility, scalability and
                            availability with respect to each implementation.<br></br>
                            <br></br>
                            Testing and experimentation of robotic applications could be
                            made far easier than VR with a significant increase of control
                            over various environmental constraints and limitations. Hence,
                            we combined both the virtual and physical robots and created a
                            mixed reality swarm robotics platform. Moreover, a web-based
                            simulator was implemented to visualize the movements of
                            robots. The positioning of physical robots was vital when
                            visualizing. Thus an overhead camera was used to identify the
                            positions of the robots using the image processing with OpenCV
                            and represent them on the simulator.<br></br>
                            <br></br>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
