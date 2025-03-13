"use client"

import type React from "react"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Mail, MapPin, Linkedin, FileText, BookOpen, ChevronDown } from "lucide-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollProgress } from "@/components/scroll-progress"
import { AdvancedTyping } from "@/components/advanced-typing"
import { TiltCard } from "@/components/tilt-card"
import { AnimatedBackground } from "@/components/animated-background"
import { StatsSection } from "@/components/stats-section"
import { useEffect, useRef, useState } from "react"

// Animation component for sections
const AnimatedSection = ({
  children,
  id,
  className,
}: { children: React.ReactNode; id?: string; className?: string }) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const { scrollY } = useScroll()
  const heroRef = useRef<HTMLDivElement>(null)
  const [heroHeight, setHeroHeight] = useState(0)

  // Parallax effect values
  const y = useTransform(scrollY, [0, heroHeight], [0, heroHeight * 0.5])
  const opacity = useTransform(scrollY, [0, heroHeight * 0.8], [1, 0])

  useEffect(() => {
    if (heroRef.current) {
      setHeroHeight(heroRef.current.offsetHeight)
    }

    const handleResize = () => {
      if (heroRef.current) {
        setHeroHeight(heroRef.current.offsetHeight)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <>
      <ScrollProgress />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm shadow-sm z-40">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <motion.h1
              className="text-xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Dr. Daniel Chen
            </motion.h1>
            <nav className="hidden md:flex space-x-6">
              {["about", "research", "publications", "education", "experience"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  className="text-slate-700 hover:text-primary transition-colors relative group"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    layoutId="underline"
                  />
                </motion.a>
              ))}
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <div ref={heroRef} className="relative h-screen flex items-center overflow-hidden pt-16">
          <AnimatedBackground className="opacity-30" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0"
            style={{ y, opacity }}
          />

          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-white shadow-lg"
            >
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Dr. Daniel Chen"
                fill
                className="object-cover"
                priority
              />
            </motion.div>

            <div className="md:ml-8">
              <AdvancedTyping text="Daniel Chen" className="text-4xl md:text-5xl font-bold mb-2" typingSpeed={80} />

              <motion.h2
                className="text-xl md:text-2xl font-medium text-slate-700 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                Dr. P.H.
              </motion.h2>

              <motion.p
                className="text-lg md:text-xl font-medium text-primary mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                Associate Director of Research
              </motion.p>

              <motion.div
                className="flex items-center text-slate-600 mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <MapPin className="w-5 h-5 mr-2" />
                <span>Milken Institute School of Public Health, The George Washington University</span>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-2 mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                {["Public Health", "Community Resilience", "System Dynamics", "Mixed-Methods Research"].map(
                  (badge, index) => (
                    <motion.div
                      key={badge}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 1.8 + index * 0.1 }}
                    >
                      <Badge variant="outline" className="bg-white">
                        {badge}
                      </Badge>
                    </motion.div>
                  ),
                )}
              </motion.div>
            </div>
          </div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <a href="#about" className="flex flex-col items-center text-slate-600 hover:text-primary transition-colors">
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-6 h-6 animate-bounce" />
            </a>
          </motion.div>
        </div>

        {/* About Section */}
        <AnimatedSection id="about" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              About
            </motion.h2>

            <div className="max-w-4xl mx-auto">
              {[
                "Dr. Kuan-Lung Daniel Chen is the Associate Director of Research at the Center for Community Resilience (CCR) at The George Washington University Milken Institute School of Public Health. He leads research efforts at CCR involving mixed-methods practice based research, including measurement development, community needs assessment, evaluation, and the advancement of participatory research and system dynamics modeling methods for achieving equity and improving community resilience.",
                "Daniel is a mixed-methods public health researcher using research methods to elevate community voice and leadership, create better data tools for improving equity, and identify or develop metrics to ensure accountability for systems change towards community resilience. He is also interested in Workforce for Health and cross-sector collaborations as key drivers for achieving equity.",
                "Prior to joining the Center for Community Resilience, Daniel worked as a community coalition builder in Philadelphia, managing the Hep B United Philadelphia coalition and the national Hep B United coalition. Daniel received his bachelor's degree in Molecular and Cell Biology from UC Berkeley, a Master of Public Health degree from Drexel University, and a Doctor of Public Health degree in Health Policy from the George Washington University Milken Institute School of Public Health.",
              ].map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-lg text-slate-700 mb-4 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Section */}
        <StatsSection />

        {/* Research Interests */}
        <AnimatedSection id="research" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Research Focus
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Community Voice & Leadership",
                  description:
                    "Elevating community voice and leadership through participatory research methods and community-based approaches.",
                },
                {
                  title: "Equity Data Tools",
                  description:
                    "Creating better data tools for improving equity and identifying metrics to ensure accountability for systems change.",
                },
                {
                  title: "Cross-Sector Collaboration",
                  description:
                    "Studying workforce for health and cross-sector collaborations as key drivers for achieving equity and community resilience.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <TiltCard className="h-full">
                    <Card className="bg-white h-full border-0 shadow-md">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-slate-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Publications */}
        <AnimatedSection id="publications" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Publications
            </motion.h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  text: "Ellis, W., Hayes, K., Salas, E., Bultema, S.A., Gousse, T., & Chen, K.D. (2025). Addressing Systemic Inequities: An Evaluation of the Resilience Catalysts in Public Health Program. JPHMP, 31(2):p E70-E79, March/April 2025. | DOI: 10.1097/PHH.0000000000002053",
                  link: "https://doi.org/10.1097/PHH.0000000000002053",
                },
                {
                  text: "Ellis, W., Dietz, W. H., & Chen, K. D. (2022). Community Resilience: A Dynamic Model for Public Health 3.0. Journal of public health management and practice : JPHMP, 28(Suppl 1), S18–S26.",
                  link: "https://doi.org/10.1097/PHH.0000000000001413",
                },
                {
                  text: "King, S., Chen, K., & Chokshi, B. (2019). Becoming Trauma Informed: Validating a Tool to Assess Health Professional's Knowledge, Attitude, and Practice. Pediatric Quality & Safety, 4(5), e215.",
                  link: "https://doi.org/10.1097/pq9.0000000000000215",
                },
                {
                  text: "Chen, K. (2020). Health-Related Social Needs Workforce: Health Care Worker Tasks, Functions, and Roles for Coordinating Cross-Sector Services. ProQuest Dissertations Publishing.",
                  link: "https://www.proquest.com/docview/2333949745",
                },
                {
                  text: "Chokshi B, Chen KLD, Beers L. (2020) Interactive case-based childhood adversity and trauma-informed care electronic modules for pediatric primary care. MedEdPORTAL. 16:10990.",
                  link: "https://doi.org/10.15766/mep_2374-8265.10990",
                },
              ].map((publication, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <TiltCard className="h-full" tiltAmount={5}>
                    <Card className="bg-slate-50 transition-all duration-300 hover:shadow-md border-0">
                      <CardContent className="pt-6">
                        <p className="text-slate-700 mb-2">{publication.text}</p>
                        <a
                          href={publication.link}
                          className="text-primary flex items-center text-sm group"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:translate-x-1" />{" "}
                          View Publication
                        </a>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}

              <div className="text-center mt-8">
                <motion.a
                  href="#"
                  className="inline-flex items-center text-primary hover:underline"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <BookOpen className="w-5 h-5 mr-2" /> View All Publications
                </motion.a>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Education */}
        <AnimatedSection id="education" className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Education
            </motion.h2>

            <div className="max-w-3xl mx-auto space-y-8">
              {[
                {
                  school: "The George Washington University- Milken Institute School of Public Health",
                  degree: "Doctor of Public Health (DrPH), Health Policy",
                  years: "2014 - 2019",
                  dissertation:
                    "Health-Related Social Needs Workforce: Health Care Worker Tasks, Functions, and Roles for Coordinating Cross-sector Services",
                  dissertationLink: "https://scholarspace.library.gwu.edu/etd/4m90dw12j",
                },
                {
                  school: "Drexel University Dornsife School of Public Health",
                  degree: "Master of Public Health (MPH), Health Management and Policy",
                  years: "2009 - 2011",
                  activities: "Activities and societies: Drexel University Health Management and Policy Club",
                },
                {
                  school: "University of California, Berkeley",
                  degree: "BA, Molecular and Cell Biology",
                  years: "2002 - 2007",
                  activities:
                    "Activities and societies: Social Entrepreneurs in Health, Biology Scholars Program, Residence Hall Assembly, National Residence Hall Honorary, NACURH 2006 Conference Team, Cal Jazz Choir, Perfect Fifth, University of California Men's Chorale",
                },
              ].map((education, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="flex flex-col md:flex-row gap-6"
                >
                  <div className="md:w-1/4 flex justify-center">
                    <motion.div
                      className="w-24 h-24 relative"
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Image
                        src="/placeholder.svg?height=100&width=100"
                        alt={`${education.school} Logo`}
                        fill
                        className="object-contain"
                      />
                    </motion.div>
                  </div>
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-bold">{education.school}</h3>
                    <p className="text-lg text-primary mb-1">{education.degree}</p>
                    <p className="text-slate-600 mb-2">{education.years}</p>

                    {education.dissertation && (
                      <>
                        <p className="text-slate-700">
                          <strong>Dissertation:</strong> {education.dissertation}
                        </p>
                        <a
                          href={education.dissertationLink}
                          className="text-primary flex items-center text-sm mt-2 group"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-1 transition-transform duration-300 group-hover:translate-x-1" />{" "}
                          View Dissertation
                        </a>
                      </>
                    )}

                    {education.activities && <p className="text-slate-700">{education.activities}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Experience */}
        <section id="experience" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Professional Experience
            </motion.h2>

            <Tabs defaultValue="current" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="current">Current Positions</TabsTrigger>
                <TabsTrigger value="previous">Previous Experience</TabsTrigger>
              </TabsList>

              <TabsContent value="current" className="space-y-8">
                {[
                  {
                    title: "Associate Director of Research",
                    organization: "Center for Community Resilience · Full-time",
                    period: "Jul 2021 - Present · 3 yrs 9 mos",
                    description: [
                      "I lead CCR's research methodology innovations and research management, working to further establish CCR's subject matter expertise in public health and community resilience. I also lead the adoption of technology to enhance all aspects of CCR's research operations.",
                      "To support the overall CCR growth, I serve as a Co-Principal Investigator for grant and contract management, and seek out potential research collaborations, with emphasis on inter-disciplinary research. Additionally, I am working with program leads within CCR to strengthen our internal linkage between research, policy, and communications work.",
                    ],
                    skills: ["System Dynamics", "Research", "Public Health"],
                  },
                  {
                    title: "Assistant Research Professor",
                    organization:
                      "The George Washington University- Milken Institute School of Public Health · Full-time",
                    period: "Sep 2022 - Present · 2 yrs 7 mos",
                    description: [
                      "I lead research efforts that use research methods to elevate community voice and ownership in community-based research, create better data tools for improving equity, and develop metrics to ensure accountability for systems change towards community resilience. I also teach classes on applying community-based system dynamics modeling in public health practice.",
                    ],
                    skills: ["Public Health", "Public Speaking"],
                  },
                ].map((position, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <TiltCard className="h-full" tiltAmount={3}>
                      <Card className="border-0 shadow-md">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/5">
                              <motion.div
                                className="w-16 h-16 relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                              >
                                <Image
                                  src="/placeholder.svg?height=80&width=80"
                                  alt={position.title}
                                  fill
                                  className="object-contain"
                                />
                              </motion.div>
                            </div>
                            <div className="md:w-4/5">
                              <h3 className="text-xl font-bold">{position.title}</h3>
                              <p className="text-primary mb-1">{position.organization}</p>
                              <p className="text-slate-600 mb-4">{position.period}</p>

                              {position.description.map((paragraph, i) => (
                                <p key={i} className="text-slate-700 mb-2 last:mb-0">
                                  {paragraph}
                                </p>
                              ))}

                              <div className="flex flex-wrap gap-2 mt-3">
                                {position.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="previous" className="space-y-8">
                {[
                  {
                    title: "Senior Researcher, Center for Community Resilience",
                    organization:
                      "The George Washington University- Milken Institute School of Public Health · Full-time",
                    period: "Jan 2020 - Jul 2021 · 1 yr 7 mos",
                    description: [
                      "Field Research: I led research efforts that apply various methodologies (e.g. system dynamics modeling, thematic analysis, data visualization) to create shared understanding among cross-sector partners, track local network progress in achieving their community resilience milestones and goals, and identify opportunities for learning and growth.",
                    ],
                    skills: ["System Dynamics", "Research", "Public Health"],
                  },
                  {
                    title: "Public Health Program Manager",
                    organization: "Hepatitis B Foundation",
                    period: "Aug 2011 - Jul 2014 · 3 yrs",
                    description: [
                      "I was the full-time staff based in Philadelphia to develop the local hepatitis B community coalition and establish multi-sector partnerships with businesses, arts and media, health care, public health, social services, community-based organizations, and government entities.",
                    ],
                    skills: ["Program Development", "Health Education", "Coalition Development"],
                  },
                ].map((position, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <TiltCard className="h-full" tiltAmount={3}>
                      <Card className="border-0 shadow-md">
                        <CardContent className="pt-6">
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-1/5">
                              <motion.div
                                className="w-16 h-16 relative"
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                              >
                                <Image
                                  src="/placeholder.svg?height=80&width=80"
                                  alt={position.title}
                                  fill
                                  className="object-contain"
                                />
                              </motion.div>
                            </div>
                            <div className="md:w-4/5">
                              <h3 className="text-xl font-bold">{position.title}</h3>
                              <p className="text-primary mb-1">{position.organization}</p>
                              <p className="text-slate-600 mb-4">{position.period}</p>

                              {position.description.map((paragraph, i) => (
                                <p key={i} className="text-slate-700 mb-2 last:mb-0">
                                  {paragraph}
                                </p>
                              ))}

                              <div className="flex flex-wrap gap-2 mt-3">
                                {position.skills.map((skill) => (
                                  <Badge key={skill} variant="secondary">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TiltCard>
                  </motion.div>
                ))}

                <div className="text-center mt-8">
                  <motion.a
                    href="#"
                    className="inline-flex items-center text-primary hover:underline"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    View More Experience
                  </motion.a>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Media Section */}
        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Featured Media
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  title: "Healing Through Equity and Resilience",
                  description:
                    "Building Community Resilience teams are engaging in dialogues locally and across the country to embed equity as a key driver for their community resilience work.",
                },
                {
                  title: "This Is Building Community Resilience",
                  description:
                    "After 3 years of learning together as a collaborative, we are actively working on these strategies for creating a movement and building a resilient nation.",
                },
                {
                  title: "Reading Writing and Resilience",
                  description:
                    "Education partners of the Building Community Resilience collaborative are addressing the Pair of ACEs in their communities.",
                },
              ].map((media, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <TiltCard className="h-full">
                    <Card className="overflow-hidden border-0 shadow-md h-full">
                      <motion.div
                        className="aspect-video relative bg-slate-200 overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image
                          src="/placeholder.svg?height=200&width=350"
                          alt={media.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="text-white font-medium">Watch Video</span>
                          </motion.div>
                        </div>
                      </motion.div>
                      <CardContent className="pt-4">
                        <h3 className="font-bold mb-2">{media.title}</h3>
                        <p className="text-sm text-slate-600 mb-3">{media.description}</p>
                        <a href="#" className="text-primary text-sm hover:underline inline-flex items-center group">
                          Watch Video
                          <motion.span
                            className="inline-block ml-1"
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.2 }}
                          >
                            →
                          </motion.span>
                        </a>
                      </CardContent>
                    </Card>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-primary/10 relative overflow-hidden">
          <AnimatedBackground className="opacity-20" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.h2
              className="text-3xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Contact
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-md mx-auto"
            >
              <TiltCard>
                <Card className="bg-white rounded-lg shadow-xl border-0 p-8">
                  <div className="flex flex-col items-center text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Image
                        src="/placeholder.svg?height=120&width=120"
                        alt="Dr. Daniel Chen"
                        width={120}
                        height={120}
                        className="rounded-full mb-4 border-4 border-white shadow-md"
                      />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-1">Dr. Daniel Chen</h3>
                    <p className="text-slate-600 mb-4">Associate Director of Research</p>

                    <div className="w-full space-y-4 mt-4">
                      <motion.a
                        href="mailto:contact@example.com"
                        className="flex items-center justify-center gap-2 w-full p-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Mail className="w-5 h-5" />
                        Contact via Email
                      </motion.a>

                      <motion.a
                        href="#"
                        className="flex items-center justify-center gap-2 w-full p-3 bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Linkedin className="w-5 h-5" />
                        Connect on LinkedIn
                      </motion.a>

                      <motion.a
                        href="#"
                        className="flex items-center justify-center gap-2 w-full p-3 bg-white border border-slate-300 text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <FileText className="w-5 h-5" />
                        Download CV
                      </motion.a>
                    </div>
                  </div>
                </Card>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-800 text-white py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold">Dr. Daniel Chen</h3>
                <p className="text-slate-300">Associate Director of Research</p>
              </div>
              <div className="flex space-x-6">
                {["about", "research", "publications", "education", "experience"].map((item) => (
                  <a key={item} href={`#${item}`} className="text-slate-300 hover:text-white transition-colors">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
              </div>
            </div>
            <div className="mt-8 text-center text-slate-400 text-sm">
              <p>© {new Date().getFullYear()} Dr. Daniel Chen. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <ScrollToTop />
      </div>
    </>
  )
}

