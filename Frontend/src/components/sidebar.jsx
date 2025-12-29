import React, { useState } from 'react';

const Sidebar = ({ history, onSelectReview, onNewChat }) => {
    // UI State: Handles the collapse/expand logic locally
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
            <div className="sidebar-top">
                <button className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
                    ☰
                </button>
                
                {isOpen && (
                    <button className="new-chat-btn" onClick={onNewChat}>
                        <span className="plus-icon">+</span>
                        New chat
                    </button>
                )}
            </div>

            {isOpen && (
                <div className="sidebar-content">
                    <div className="sidebar-label">Recent</div>
                    <div className="history-list">
                        {history.length > 0 ? (
                            history.map((item) => (
                                <div 
                                    key={item._id} 
                                    className="history-card" 
                                    onClick={() => onSelectReview(item)}
                                >
                                    <span className="chat-msg-icon">💬</span>
                                    <span className="history-snippet">
                                        {/* Defensive check for missing code field */}
                                        {item.code?.substring(0, 30) || "Untitled Chat"}
                                    </span>
                                </div>
                            ))
                        ) : (
                            <p className="empty-text">No recent chats</p>
                        )}
                    </div>
                </div>
            )}

            {isOpen && (
                <div className="sidebar-footer">
                    <div className="footer-item">
                        <span className="settings-icon">⚙️</span>
                        Settings and help
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;