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
１．Ａは、建築設計工事等を業とする株式会社である。Ｂは、複合商業施設の経営等を業とする株式会社である。Ｂは、Ａとの間で、令和４年４月１日、Ｂの所有する土地上にＡが鉄筋コンクリート造の５階建て店舗用建物（以下「甲建物」という。）を報酬２億円で新築することを内容とする建築請負契約（以下「本件請負契約」という。）を締結した。
２．本件請負契約の締結に当たって、Ｂは、Ａに対して、「外壁の塗装には塗料αを使用してほしい。」と申し入れ、Ａはこれを了承した。塗料αは、極めて鮮やかなピンク色の外壁用塗料である。
３．Ａの担当者が近隣住民に建築計画の概要を説明した際に、地域の美観を損ねるとして多数の住民から反発を受けたため、Ａは、周辺の景観に合致する、より明度の低い同系色の外壁用塗料である塗料βで甲建物の外壁を塗装することとした。
４．令和７年１０月２５日、塗料βによる外壁塗装を含む甲建物の工事が完了した。同月３０日、Ａは、Ｂに対して、甲建物を引き渡した。
５．令和７年１０月３１日、Ｂは、Ａに対して、「塗料αは、Ｂの運営する他の店舗でも共通して用いられており、Ｂのコーポレートカラーとして特に採用したものである。外壁塗装に塗料βを使用したことは重大な契約違反である。この件の対処については、社内で検討の上、改めて協議させてもらう。」と申し入れた。
６．塗料βは、塗料αよりも耐久性が高く、防汚防水性能にも優れており、高価である。そのため、外壁塗装を塗料αで行った場合の甲建物の客観的価値よりも、外壁塗装を塗料βで行った場合の甲建物の客観的価値の方が高い。

〔設問１〕 
【事実】１から６までを前提として、次の問いに答えなさい。
(1)Ｂが塗料αによる再塗装を求めたが、Ａがこれを拒絶した場合において、Ｂは、Ａに対して、本件請負契約に基づく報酬の減額を請求している。Ｂの請求が認められるか、【事実】６に留意しつつ論じなさい。 
(2)Ａが塗料αによる再塗装を行う旨の申入れを行ったが、Ｂがこれを拒絶した場合において、Ｂは、Ａに対して、再塗装に要する費用を損害としてその賠償を請求している。Ｂの請求が認められるか論じなさい。
`

  
const handleSubmit = async () => {
  setIsLoading(true)
  setShowFeedback(false)

  try {
    const response = await fetch('/api/r4-yobi-minpou-1', {
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

const q_r4_yobi_minpou_1 = () => {
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

export default q_r4_yobi_minpou_1;
