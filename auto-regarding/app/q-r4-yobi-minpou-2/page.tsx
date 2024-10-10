'use client'; 
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExternalLink } from 'lucide-react'
import { Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const PastQuestionChallenge = () => {
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sampleQuestion = `【事実】 
７．Ｃは、個人でラーメン店を経営し、全国に多数の店舗を有する。Ｄは、創業当時からＣの従業員として重要な貢献をしてきたが、独立して自分のラーメン店を持ちたいと思うようになり、その旨をＣに伝えた。 
８．Ｃは、Ｄの長年の功労に報いたいと考え、Ｃの所有する土地及びその上の店舗用建物（以下併せて「乙不動産」という。）を無償でＤに貸すが、固定資産税はＤに負担してほしいと申し出た。Ｄは、この申出を受け、令和２年１月１０日、Ｃとの間で、上記の内容を記した覚書（以下「本件覚書」という。）を取り交わして使用貸借契約を締結し、これに基づいて乙不動産の引渡しを受けた。 同年３月１日、Ｄは、乙不動産においてラーメン店（以下「本件ラーメン店」という。）を開業し、乙不動産の固定資産税を同年分からＣに代わり毎年支払った。
９．令和８年１月、Ｃは死亡し、子ＥがＣを単独相続したが、Ｅは、詳しい事情を知らないまま、乙不動産の固定資産税をＤに支払ってもらっていた。なお、乙不動産の登記名義人は、Ｃのままであった。
10．令和９年３月１日、Ｄは死亡し、乙不動産は本件ラーメン店の従業員により閉鎖された。 Ｄを単独相続した子Ｆは、本件ラーメン店の営業には全く関与していなかったが、乙不動産はＤがＣから贈与を受けたものと理解していた。そこで、Ｆは、Ｅに対して、「乙不動産は、ＤがＣから贈与を受けたものであるから、相続を機会に、登記名義を自分に移したい。」と相談した。Ｅは、固定資産税をＤが支払っていたのはそういうわけだったのかと納得し、同年４月１日、乙不動産の登記名義人をＦとするために必要な登記が行われた。その後、Ｆは、本件ラーメン店の営業を引き継ぐことを決意し、同年５月１日、前記従業員から乙不動産の管理を引き継ぎ、間もなく営業を再開した。Ｆは、令和２９年に至るまで、乙不動産において本件ラーメン店の営業を継続している。 
11．令和２９年３月、Ｅは、本件覚書を発見し、ＣからＤへの乙不動産の贈与が行われていなかったことを知った。同年４月１日、Ｅは、Ｆに対し、所有権に基づき、乙不動産の明渡しを請求する訴えを提起した。これに対して、Ｆは、同月１５日、乙不動産の２０年の取得時効を援用した。

〔設問２〕 
【事実】７から11までを前提として、【事実】11においてＦが援用する乙不動産の取得時効の成否について論じなさい。
`
  
const handleSubmit = async () => {
  setIsLoading(true)
  setShowFeedback(false)

  try {
    const response = await fetch('/api/r4-yobi-minpou-2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ input_text: answer })
    });

    const data = await response.json();
    setFeedback(data.result);
    setShowFeedback(true)
  } catch (error) {
    console.error('Error fetching feedback:', error)
    setFeedback('添削中にエラーが発生しました。もう一度お試しください。')
    setShowFeedback(true)
  } finally {
    setIsLoading(false)
    }
  }

  const openExplanation = () => {
    window.open('https://note.com/amaru_shihou/n/n79aabc36442a?magazine_key=m69fcd49368c4&from=membership-magazine', '_blank')
  }

  const openLawReference = () => {
    window.open('https://laws.e-gov.go.jp/law/129AC0000000089', '_blank')
  }

  return (
    <div className="min-h-screen bg-[#f0f4f8] py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0a2472]">令和4年予備試験過去問 設問1</h1>
          <Button
            variant="outline"
            onClick={openLawReference}
            className="border-[#0a2472] text-[#0a2472] hover:bg-[#0a2472] hover:text-white"
          >
            条文を見る
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-6">
          <Card className="border-[#4e9af1] overflow-hidden rounded-lg">
            <CardHeader className="bg-[#0a2472] text-white rounded-none">
              <CardTitle>問題</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-blue max-w-none pt-6">
              <p className="whitespace-pre-line">{sampleQuestion}</p>
            </CardContent>
          </Card>
          <Card className="border-[#4e9af1] overflow-hidden rounded-lg">
            <CardHeader className="bg-[#0a2472] text-white rounded-none">
              <CardTitle>解答</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Textarea
                placeholder="ここに解答を入力してください"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                rows={15}
                maxLength={4000}
                className="mb-4 w-full"
              />
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => window.history.back()} className="border-[#0a2472] text-[#0a2472] hover:bg-[#0a2472] hover:text-white">トップに戻る</Button>
                <Button onClick={handleSubmit} 
  className="bg-[#4e9af1] text-white hover:bg-[#3a7bd5]"
  disabled={isLoading}
>
  {isLoading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      自動添削中
    </>
  ) : (
    '添削する'
  )}
</Button>
                <Button variant="outline" onClick={openExplanation} className="border-[#0a2472] text-[#0a2472] hover:bg-[#0a2472] hover:text-white">
                  解説を見る
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          {showFeedback && (
            <Card className="border-[#4e9af1] overflow-hidden rounded-lg">
              <CardHeader className="bg-[#0a2472] text-white rounded-none">
                <CardTitle>添削結果</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 prose mx-auto max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}
                  components={{
                    table: ({ node, ...props }) => (
                      <table 
                        style={{ margin: '0 auto' }}
                        className="w-full table-auto border-collapse border border-gray-300"
                      >
                        {props.children}
                      </table>
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-2 py-2 border border-gray-300 bg-gray-100 text-left">
                        {props.children}
                      </th>
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-2 border border-gray-300 text-left">
                        {props.children}
                      </td>
                    ),
                  }}
                >
                  {feedback}
                </ReactMarkdown>
                <div className="flex justify-between mt-4">
                  <Button variant="outline" onClick={() => window.history.back()} className="border-[#0a2472] text-[#0a2472] hover:bg-[#0a2472] hover:text-white">トップに戻る</Button>
                  <Button variant="outline" onClick={openExplanation} className="border-[#0a2472] text-[#0a2472] hover:bg-[#0a2472] hover:text-white">
                    解説を見る
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

const q_r4_yobi_minpou_2 = () => {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white p-8">
        {/* 他のコンテンツ */}
        <PastQuestionChallenge/>
        {/* 他のコンテンツ */}
      </div>
    </div>
  );
};

export default q_r4_yobi_minpou_2;
