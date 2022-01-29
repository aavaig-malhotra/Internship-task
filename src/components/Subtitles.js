import styled from 'styled-components';
import React, { useState, useCallback, useEffect } from 'react';
import { Table } from 'react-virtualized';
import unescape from 'lodash/unescape';
import debounce from 'lodash/debounce';

import { ReactTransliterate } from 'react-transliterate';
import 'react-transliterate/dist/index.css';

const Style = styled.div`
    flex: 0.6;
    position: relative;
    box-shadow: 0px 5px 25px 5px rgb(0 0 0 / 80%);
    background-color: rgb(0 0 0 / 100%);
    display: flex !important;

    .ReactVirtualized__Table {
        flex: 0.6;

        .ReactVirtualized__Table__Grid {
            outline: none;
        }

        .ReactVirtualized__Grid__innerScrollContainer {
            overflow: visible !important;
        }

        .ReactVirtualized__Table__row {
            overflow: visible !important;

            .item {
                height: 100%;
                padding: 5px;
                position: relative;
                z-index: 0 !important;

                ul {
                    position: absolute !important;
                    bottom: 200px !important;
                    left: 0 !important;
                    z-index: 99999999 !important;
                    height: 210px !important;
                    width: 100% !important;
                    transform: translate(0px, 0px) !important;
                    display: block !important;

                    li {
                        color: #000 !important;
                    }
                }

                .textarea {
                    border: none !important;
                    width: 100% !important;
                    height: 100% !important;
                    color: #fff !important;
                    font-size: 12px !important;
                    padding: 10px !important;
                    text-align: center !important;
                    background-color: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    transition: all 0.2s ease !important;
                    resize: none !important;
                    outline: none !important;

                    input {
                        background-color: transparent !important;
                        border: none !important;
                        outline: none !important;
                        color: #fff !important;
                        height: 100%;
                        width: 100%;
                        // background-color: red !important;
                    }

                    &.highlight {
                        background-color: rgb(0 87 158) !important;
                        border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    }

                    &.illegal {
                        background-color: rgb(123 29 0);
                        border: 1px solid rgba(255, 255, 255, 0.3);
                    }
                }
            }
        }
    }
`;

export default function Subtitles({
    currentIndex,
    subtitle,
    checkSub,
    player,
    updateSub,
    subtitleKey,
    englishSubtitle,
}) {
    const [height, setHeight] = useState(100);

    const resize = useCallback(() => {
        setHeight(document.body.clientHeight - 170);
    }, [setHeight]);

    useEffect(() => {
        resize();
        if (!resize.init) {
            resize.init = true;
            const debounceResize = debounce(resize, 500);
            window.addEventListener('resize', debounceResize);
        }
    }, [resize]);

    useEffect(() => {
        console.log('From subtitles menu ', subtitleKey);
    }, [subtitleKey]);

    return (
        <Style className="subtitles">
            <Table
                headerHeight={40}
                width={250}
                height={height}
                rowHeight={80}
                scrollToIndex={currentIndex}
                rowCount={subtitle.length}
                rowGetter={({ index }) => {
                    return englishSubtitle.length < subtitle.length ? subtitle[index] : englishSubtitle[index];
                }}
                headerRowRenderer={() => null}
                rowRenderer={(props) => {
                    return (
                        <div
                            key={props.key}
                            className={props.className}
                            style={props.style}
                            onClick={() => {
                                if (player) {
                                    player.pause();
                                    if (player.duration >= props.rowData.startTime) {
                                        player.currentTime = props.rowData.startTime + 0.001;
                                    }
                                }
                            }}
                        >
                            <div className="item">
                                <ReactTransliterate
                                    value={unescape(props.rowData.text)}
                                    onChangeText={(text) => {
                                        console.log(props);
                                        updateSub(props.rowData, {
                                            text,
                                        });
                                    }}
                                    lang="en"
                                    default={false}
                                    containerClassName={[
                                        'textarea',
                                        currentIndex === props.index ? 'highlight' : '',
                                        checkSub(props.rowData) ? 'illegal' : '',
                                    ]
                                        .join(' ')
                                        .trim()}
                                />
                            </div>
                        </div>
                    );
                }}
            ></Table>

            <Table
                headerHeight={40}
                width={250}
                height={height}
                rowHeight={80}
                scrollToIndex={currentIndex}
                rowCount={subtitle.length}
                rowGetter={({ index }) => subtitle[index]}
                headerRowRenderer={() => null}
                rowRenderer={(props) => {
                    return (
                        <div
                            key={props.key}
                            className={props.className}
                            style={props.style}
                            onClick={() => {
                                if (player) {
                                    player.pause();
                                    if (player.duration >= props.rowData.startTime) {
                                        player.currentTime = props.rowData.startTime + 0.001;
                                    }
                                }
                            }}
                        >
                            <div className="item">
                                <ReactTransliterate
                                    value={unescape(props.rowData.text)}
                                    onChangeText={(text) => {
                                        updateSub(props.rowData, {
                                            text,
                                        });
                                    }}
                                    lang={subtitleKey}
                                    containerClassName={[
                                        'textarea',
                                        currentIndex === props.index ? 'highlight' : '',
                                        checkSub(props.rowData) ? 'illegal' : '',
                                    ]
                                        .join(' ')
                                        .trim()}
                                />
                            </div>
                        </div>
                    );
                }}
            ></Table>
        </Style>
    );
}
