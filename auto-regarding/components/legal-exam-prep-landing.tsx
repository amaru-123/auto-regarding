'use client'; 

import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';

export default function LegalExamPrepLanding() {
  const [activeTab, setActiveTab] = useState("民法")

  const legalAreas = ["民法", "刑法", "憲法", "商法", "民事訴訟法", "刑事訴訟法", "行政法"]

  const questions = {
    民法: [
      { year: "令和4年", question: "設問1", importance: 3, disabled: false, link: "/q-r4-yobi-minpou-1"  },
      { year: "令和4年", question: "設問2", importance: 2, disabled: false, link: "/q-r4-yobi-minpou-2"  },
      { year: "平成26年", question: "設問1", importance: 3, disabled: true },
    ],
    刑法: [
      { year: "令和4年", question: "設問1", importance: 3, disabled: true, link: ""  },
      { year: "平成23年", question: "", importance: 3, disabled: true, link: ""   },
      { year: "平成26年", question: "", importance: 3, disabled: true, link: ""   },
    ],
    憲法: [
      { year: "令和3年", question: "", importance: 3, disabled: true, link: ""   },
      { year: "令和2年", question: "", importance: 3, disabled: true, link: ""   },
      { year: "平成26年", question: "", importance: 3, disabled: true, link: ""   },
    ],
    商法: [
      { year: "令和2年", question: "設問1", importance: 2, disabled: true, link: ""   },
      { year: "平成27年", question: "設問1", importance: 3, disabled: true, link: ""   },
      { year: "平成27年", question: "設問2", importance: 3, disabled: true, link: ""   },
    ],
    民事訴訟法: [
      { year: "令和2年", question: "設問1", importance: 3, disabled: true, link: ""   },
      { year: "令和2年", question: "設問2", importance: 2, disabled: true, link: ""   },
      { year: "平成28年", question: "設問1", importance: 3, disabled: true, link: ""   },
    ],
    刑事訴訟法: [
      { year: "令和3年", question: "設問1", importance: 2, disabled: true, link: ""   },
      { year: "平成27年", question: "設問1", importance: 3, disabled: true, link: ""   },
      { year: "平成26年", question: "", importance: 3, disabled: true, link: ""   },
    ],
    行政法: [
      { year: "令和元年", question: "設問1", importance: 2, disabled: true, link: ""   },
      { year: "平成30年", question: "設問1", importance: 3, disabled: true, link: ""   },
      { year: "平成30年", question: "設問2", importance: 3, disabled: true, link: ""   },
    ],
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8]">
      {/* Header */}
      <header className="relative">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E5%8F%B8%E6%B3%95%E8%A9%A6%E9%A8%93%E3%83%BB%E4%BA%88%E5%82%99%E8%A9%A6%E9%A8%93%20%E9%81%8E%E5%8E%BB%E5%95%8F%E8%87%AA%E5%8B%95%E6%B7%BB%E5%89%8A%20(1)-WWlIobV6RzxQn361Po6ExjCi05WBtL.png"
          alt="司法試験・予備試験 過去問自動添削"
          className="w-full h-auto"
        />
      </header>

      {/* Tab Navigation */}
      <nav className="bg-[#0a2472] shadow-md">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="h-16 w-full justify-start overflow-x-auto bg-transparent">
              {legalAreas.map((area) => (
                <TabsTrigger
                  key={area}
                  value={area}
                  className="px-4 py-2 text-sm md:text-base whitespace-nowrap text-white data-[state=active]:bg-[#4e9af1] data-[state=active]:text-white"
                >
                  {area}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Content Area */}
      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} className="w-full">
          {legalAreas.map((area) => (
            <TabsContent key={area} value={area}>
              <div className="bg-white rounded-lg shadow-md p-6 border border-[#4e9af1]">
                <h2 className="text-2xl font-semibold mb-4 text-[#0a2472]">{area}</h2>
                {(questions[area as keyof typeof questions] || []).map((q, index) => (
                  <Card key={index} className="mb-4">
                    <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                      <div className="flex items-center space-x-4 flex-grow">
                        <CardTitle className="text-lg font-bold">
                          <Badge variant="outline" className="mr-2 text-base font-semibold">
                            {q.year}
                          </Badge>
                          予備試験過去問
                          {q.question && (
                            <Badge variant="secondary" className="ml-2 text-base font-semibold">
                              {q.question}
                            </Badge>
                          )}
                        </CardTitle>
                      </div>
                      <span className="text-lg font-bold text-[#4e9af1] whitespace-nowrap justify-self-end">
                        重要度{'★'.repeat(q.importance)}
                        <span className="text-gray-300">{'☆'.repeat(3 - q.importance)}</span>
                      </span>
                      <Link href={q.link || '#'}>
                        <Button 
                          className={`ml-4 whitespace-nowrap ${
                            q.disabled 
                              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                              : 'bg-[#4e9af1] text-white hover:bg-[#3a7bd5]'
                          }`}
                          disabled={q.disabled}
                        >
                          過去問に挑戦する
                        </Button>
                      </Link>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-[#0a2472] text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>@2024 amaru All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}