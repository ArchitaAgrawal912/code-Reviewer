import { useState } from 'react';
import Markdown from "react-markdown";
import rehypeHighlight from 'rehype-highlight';
import ReactDiffViewer from 'react-diff-viewer-continued';
import "highlight.js/styles/github-dark.css";

// Separate Icon component for cleaner code
const FullScreenIcon = ({ isFullScreen }) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {isFullScreen ? (
            <path d="M4 14h6v6m10-10h-6V4m0 6l7-7M3 21l7-7" /> // Exit Icon
        ) : (
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" /> // Enter Icon
        )}
    </svg>
);

const ReviewDisplay = ({ review, improvedCode, originalCode, isLoading }) => {
    const [viewMode, setViewMode] = useState('analysis');
    const [isFullScreen, setIsFullScreen] = useState(false); //

    if (isLoading) {
        return <div className="right"><h3>Processing Your Code...</h3></div>;
    }

    if (!review) {
        return <div className="right"><h3>Select a history item or review new code</h3></div>;
    }

    return (
        /* Dynamic class 'fullscreen' pulls the panel out of layout */
        <div className={`right ${isFullScreen ? 'fullscreen' : ''}`}>
            
            {/* Permanent Corner Button */}
            <button 
                className="fullscreen-toggle" 
                onClick={() => setIsFullScreen(!isFullScreen)}
                aria-label="Toggle Fullscreen"
            >
                <FullScreenIcon isFullScreen={isFullScreen} />
            </button>

            <div className="view-selector">
                <button 
                    className={viewMode === 'analysis' ? 'active' : ''} 
                    onClick={() => setViewMode('analysis')}
                >
                    Analysis
                </button>
                <button 
                    className={viewMode === 'diff' ? 'active' : ''} 
                    onClick={() => setViewMode('diff')}
                >
                    Changes
                </button>
            </div>

            <div className="content-viewport">
                {viewMode === 'analysis' ? (
                    <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
                ) : (
                    <div className="diff-container">
                        <ReactDiffViewer 

                            oldValue={originalCode} 
                            newValue={improvedCode} 
                            splitView={true} 
                            useDarkTheme={true}
                            disableWordDiff={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewDisplay;