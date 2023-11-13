import React from 'react';

export default function Developer() {
    return (
        <div style={{ backgroundColor: /*'#333'*/'transparent', textAlign: 'center', padding: '1rem', marginBottom: '0', marginTop: 'auto' }}>
            <p>
                <span style={{ marginRight: '0.5rem', fontSize: '1rem', color: '#AAAAAA' }}>
                    Powered by
                </span>
                <a
                    style={{
                        color: '#AAAAAA',
                        textDecoration: 'underline',
                        fontSize: '1rem',
                        transition: 'color 0.2s',
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.webdevme.co.uk"
                    onMouseEnter={(event) => {
                        event.target.style.color = '#fff'; // Change text color to white when hovering
                    }}
                    onMouseLeave={(event) => {
                        event.target.style.color = '#AAAAAA'; // Restore the original text color when not hovering
                    }}
                >
                    webdevme.co.uk
                </a>
            </p>
        </div>
    );
}
