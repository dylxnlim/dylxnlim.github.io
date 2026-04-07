import React, { useState } from 'react';
import TextBox from '../canvas/TextBox';
import Typewriter from '../ui/Typewriter';
import { motion } from 'motion/react';
import questBoardImg from '../../assets/questBoard.png'
import scadaImg from '../../assets/scada.png'
import floodImg from '../../assets/flood.png'
import iaacImg from '../../assets/iaac.png'
import tradingImg from '../../assets/trading.png'
import eduImg from '../../assets/edu.png'
import PortfolioCarousel from './PortfolioCarousel';
import ProjectDetails from './ProjectDetails';
import './Portfolio.css';

const Portfolio = ({ onBack }) => {
    const [selectedProject, setSelectedProject] = useState(null);

    const myProjects = [
        { id: 'scada', title: 'Smart SCADA (Digital Twin)', icon: scadaImg,
            skills: "✦ React.js ✦ Node.js ✦ Kubernetes ✦ Docker ✦ Agentic RAG ✦ NLP ✦ .NET Core ✦ Microservices ✦ .NET Core ✦ RESTFUL APIs ✦ CI/CD (Kafka, Jenkins, Prometheus, ELK) ✦ MSSQL ✦ PostgreSQL ✦",
            desc: [
                "▶ Developed a 3-tier Digital Twin web application integrated with a Unity 3D environment and Gaussian Splatting for real-time plant interior visualization.",
                "▶ Implemented a Kubernetes-based microservices backend using .NET, deployed in a secure air-gapped network using tarballs and ConfigMaps.",
                "▶ Integrated Offline LLMs and Agentic RAG (Langgraph) to provide operators with context-aware plant analytics and documentation retrieval.",
                "▶ Executed a complex database migration from legacy MSSQL to PostgreSQL, writing custom ETL scripts to maintain data integrity across different network segments.",
                "▶ Orchestrated the full DevOps stack: Jenkins CI/CD, Prometheus/Grafana monitoring, and EFK (Elasticsearch, Fluentd, Kibana) logging. (WIP)"
            ]
        },
        { id: 'flood', title: 'IoT Flood Monitoring + AWS', icon: floodImg,
            skills: "✦ AWS (IoT Core, Lambda, S3, SNS) ✦ IoT Sensors ✦ IoT RTUs ✦ Metasphere ✦ Python (Playwright/Automation)",
            desc: [
                "▶ Architected and maintained an AWS Serverless event-driven system to monitor flooding in animal enclosures.",
                "▶ Streamed data from Metasphere RTUs to AWS IoT Core, triggering automated logic via AWS Lambda.",
                "▶ Implemented real-time alerting via Amazon SNS, SES, and external WhatsApp API, with persistent logging in S3 for historical trending."
            ]
         },
        { id: 'iaac', title: 'IaaC (Terraform, Ansible, CloudFormation)', icon: iaacImg,
            skills: "✦ Terraform/Ansible (WIP) ✦ Infrastructure-as-Code (WIP) ✦ Linux (WIP) ✦",
            desc: [
                "▶ This project is currently a work-in-progress as we speak!"
            ]
         },
        { id: 'trading', title: 'Agentic AI Trading Assistant', icon: tradingImg,
            skills: "✦ Agentic RAG (Langgraph) ✦ LLMs ✦ NLP ✦ (Natural Language Processing) ✦",
            desc: [
                "▶ Integrated Google Gemini, OpenAI ChatGPT and Anthropic Claude LLM models & leveraged Agentic RAG in multi-stage Python-based trading application.",
                "▶ Implemented a multi-stage, multi-node agentic workflow to aggregate data recevied from data pipelines and make decisions."
            ]
         },
        { id: 'edu', title: 'Educational Web App (Node, AWS)', icon: eduImg,
            skills: "✦ Node.js ✦ AWS EC2 ✦ AWS Elastic IP ✦ HTML ✦ CSS ✦ JavaScript ✦",
            desc: [
                "▶ Built a full-stack learning platform using Node.js, TailwindCSS and AWS, focusing on scalable user environments.",
                "▶ Linked domain address to AWS Elastic IP to host EC2 with application running inside with spot instances for high cost savings as this was a student project."
            ]
         }
    ];

    const handleProjectClick = (project) => {
        console.log("Navigating to stats for:", project.title);
        setSelectedProject(project);
    };

    if (selectedProject) {
        return (
        <ProjectDetails 
            project={selectedProject} 
            onBack={() => setSelectedProject(null)} 
        />
        );
    }

    return (
    <div className="portfolio-wrapper">
        <img src={questBoardImg} alt="Dylan Portrait" className="portfolio-bg-image" />        
        <div className="portfolio-content">
            <div className="portfolio-header-container">
                <h1 className="portfolio-header">PROJECT SELECT</h1>
                <p className="portfolio-header">[Swipe for more 'Quests'!]</p>
            </div>

            <div className="portfolio-main-display">
                <div className="portfolio-main-display">
                    <PortfolioCarousel 
                        items={myProjects} 
                        onSelect={handleProjectClick}
                    />
                </div>
            </div>

            {/* 3. The Footer Area */}
            <div className="portfolio-footer">
                <TextBox onClick={onBack}>
                    <span>BACK</span>
                </TextBox>
            </div>
        </div>
    </div>
    );
};

export default Portfolio;