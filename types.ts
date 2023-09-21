export interface Youdio {
    youdio_id: string;
    title: string
    channelName: string;
}

export interface YoudioWithId {
    youdio: Youdio;
    id: string
}