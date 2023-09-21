import ytdl from 'ytdl-core';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
    const url = req.nextUrl.searchParams.get('url')!;

  try {
    const info = await ytdl.getInfo(url as string);
    const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly', quality: 'highestaudio' });

    if (audioFormat) {
       return NextResponse.json(audioFormat.url);
    } else {
      return NextResponse.json({message: "Nothing"})
    }
    // console.log(audioFormat)
  } catch (error) {
    console.error('Error:', error);
    // res.status(500).send('Error');
  }
}
