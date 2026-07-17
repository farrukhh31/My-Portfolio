"use client";

import { useEffect, useState } from "react";

export default function useActiveSection() {

    const [activeSection, setActiveSection] =
        useState("home");

    useEffect(() => {

        const observer = new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        setActiveSection(entry.target.id);

                    }

                });

            },

            {

                threshold: 0.55,

            }

        );

        const sections = document.querySelectorAll("section");

        sections.forEach(section => observer.observe(section));

        return () => observer.disconnect();

    }, []);

    return activeSection;

}