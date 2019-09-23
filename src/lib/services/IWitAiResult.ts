export default interface IWitAiResult {
    _text: string;
    entities: {
        [_key: string]: [
            {
                confidence: number;
                value: string;
            }
        ];
    };
    msg_id: string;
}
