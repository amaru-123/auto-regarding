// app/api/r4/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { input_text } = await request.json();

  // 環境変数からAPI情報を取得
  const API_ENDPOINT = process.env.r4_yobi_minpou_2_API_ENDPOINT!;
  const API_KEY = process.env.r4_yobi_minpou_2_API_KEY!;

  console.log('API_ENDPOINT:', API_ENDPOINT);
  console.log('API_KEY:', API_KEY);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {
            answer_text: input_text
        },
        response_mode: 'blocking',
        user: 'test_user',
      }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`APIエラー詳細: ${errorText}`);
        throw new Error(`APIエラー: ${response.statusText} - ${errorText}`);
    }

    const result = await response.json();
    console.log('APIレスポンス:', result);
    const output = result.answer || '結果が取得できませんでした。';

    return NextResponse.json({ result: output });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ result: 'エラーが発生しました。' }, { status: 500 });
  }
}
