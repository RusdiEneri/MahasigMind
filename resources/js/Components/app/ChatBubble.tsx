export interface ChatBubbleProps {
    mine: boolean;
    body: string;
    timestamp?: string;
    senderName?: string;
}

export default function ChatBubble({
    mine,
    body,
    timestamp,
    senderName,
}: ChatBubbleProps) {
    return (
        <div className={`flex flex-col ${mine ? 'items-end' : 'items-start'} my-1.5`}>
            {senderName && !mine && (
                <span className="text-[10px] font-medium text-slate-400 ms-1 mb-0.5">
                    {senderName}
                </span>
            )}
            <div
                className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
                    mine
                        ? 'bg-brand-500 text-white rounded-2xl rounded-br-xs shadow-xs'
                        : 'bg-white text-slate-700 rounded-2xl rounded-bl-xs border border-slate-100 shadow-xs'
                }`}
            >
                <p className="whitespace-pre-wrap break-words">{body}</p>
                {timestamp && (
                    <span
                        className={`block text-[10px] mt-1 text-end font-medium ${
                            mine ? 'text-brand-100' : 'text-slate-400'
                        }`}
                    >
                        {timestamp}
                    </span>
                )}
            </div>
        </div>
    );
}
