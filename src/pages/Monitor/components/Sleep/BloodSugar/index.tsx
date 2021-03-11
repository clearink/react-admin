import React, { memo, useState, useEffect, useRef } from "react";
import { BulbOutlined, RightOutlined } from "@ant-design/icons";
import { Card, Spin, Table } from "antd";
import styles from "./style.module.scss";
import BloodSugarApi from "@/http/ly/pages/BloodSugarApi";
import { useParams } from "react-router-dom";
import useMemoCallback from "@/components/Pro/hooks/memo-callback";
import * as echarts from "echarts";
import LineChartOptions from "./lineCharts";
import TimeSelect from "../components/TimeSelect";

function BloodSugar() {
    const { id } = useParams<{ id: string }>()
    console.log(id);
    const [historyListSelected, setHistoryListSelected] = useState(0);
    const [indexList, setIndexList] = useState([]);
    const [historyList, setHistoryList] = useState([]);
    const [today, setToday] = useState([]);
    const chartsRef = useRef(null);

    const getBloodSugarIndexList = useMemoCallback(() => {
        // 首页数据
        BloodSugarApi.getIndex({ memberId: id }).then(({ data }) => {
            setIndexList(data.result.latestData)
        })
        // 历史记录
        BloodSugarApi.getRecordList({ memberId: id }).then(({ data }) => {
            setHistoryList(data.result.records);
        })
        // 今日检测数据
        BloodSugarApi.getToday({ memberId: id, today: new Date() }).then(({ data }) => {
            if (data.code !== 200) return false;
            setToday(data.result);
        })

    }, [])


    useEffect(() => {
        let myChart = echarts.init(chartsRef.current!);
        myChart.setOption(LineChartOptions);
    }, [])

    console.log(indexList, "--", historyList, "--", today);
    useEffect(() => {
        getBloodSugarIndexList();
        // getEcharts();
    }, [getBloodSugarIndexList])

    const columns: any = [
        {
            title: '时段',
            align: "center",
            dataIndex: 'time',
        },
        {
            title: <div>凌晨</div>,
            align: "center",
            rowSpan: 2,
            children: [
                {
                    title: <div>
                        <span>00:00</span><br />
                        <span>-</span><br />
                        <span>03:00</span>
                    </div>,
                    align: "center",
                    dataIndex: "midnight",
                },
            ],
        },
        {
            title: "早餐",
            align: "center",
            children: [
                {
                    title: "前",
                    align: "center",
                    children: [
                        {
                            title: <div>
                                <span>06:30</span><br />
                                <span>-</span><br />
                                <span>09:00</span>
                            </div>,
                            align: "center",
                            dataIndex: "beforeBreakfast",
                        }
                    ]
                },
                {
                    title: "后",
                    align: "center",
                    children: [
                        {
                            title: <div>
                                <span>09:30</span><br />
                                <span>-</span><br />
                                <span>11:30</span>
                            </div>,
                            align: "center",
                            dataIndex: "afterBreakfast",
                        }
                    ]
                }
            ]
        },
        {
            title: "中餐",
            align: "center",
            children: [
                {
                    title: "前",
                    align: "center",
                    children: [
                        {
                            title: <div>
                                <span>11:30</span><br />
                                <span>-</span><br />
                                <span>14:00</span>
                            </div>,
                            align: "center",
                            dataIndex: "beforeLunch",
                        }
                    ]
                },
                {
                    title: "后",
                    align: "center",
                    children: [
                        {
                            title: <div>
                                <span>14:00</span><br />
                                <span>-</span><br />
                                <span>17:30</span>
                            </div>,
                            align: "center",
                            dataIndex: "afterLunch",
                        }
                    ]
                }
            ]
        },
        {
            title: "晚餐",
            align: "center",
            children: [
                {
                    title: "前",
                    align: "center",
                    children: [
                        {
                            title: <div>
                                <span>17:30</span><br />
                                <span>-</span><br />
                                <span>20:00</span>
                            </div>,
                            align: "center",
                            dataIndex: "afterDinner",
                        }
                    ]
                },
                {
                    title: "后",
                    align: "center",
                    children: [
                        {
                            title: <div>
                                <span>20:00</span><br />
                                <span>-</span><br />
                                <span>22:00</span>
                            </div>,
                            align: "center",
                            dataIndex: "beforeDinner",
                        }
                    ]
                }
            ]
        },
        {
            title: "睡前",
            align: "center",
            children: [
                {
                    title: <div>
                        <span>22:30</span><br />
                        <span>-</span><br />
                        <span>00:00</span>
                    </div>,
                    align: "center",
                    dataIndex: "beforeSleep",
                }
            ]
        }
    ];
    console.log(today);
    const data: any = [
        {
            key: 1,
            time: "血糖",
            midnight: 10,
            beforeBreakfast: 10,
            afterBreakfast: 10,
            beforeLunch: 10,
            afterLunch: 10,
            afterDinner: 10,
            beforeDinner: 10,
            beforeSleep: 10,
        },
        {
            key: 2,
            time: "水平",
            beforeBreakfast: "一般"
        }
    ];

    //     afterBreakfast: { text: "", value: 0 }
    // afterDinner: { text: "", value: 0 }
    // afterLunch: { text: "", value: 0 }
    // beforeBreakfast: { text: "", value: 0 }
    // beforeDinner: { text: "", value: 0 }
    // beforeLunch: { text: "", value: 0 }
    // beforeSleep: { text: "", value: 0 }
    // midnight: { text: "", value: 0 }


    return (
        <main className={styles.main}>
            <Spin spinning={false}>
                <div className={styles.page_wrap}>
                    <Card
                        className={styles.history_list}
                        size={"small"}
                        title={<div className={styles.card_header}>历史记录</div>}>
                        <TimeSelect
                            className='w-2/2'
                            options={Array.from({ length: 10 }, (_, i) => {
                                return { label: i, value: i }
                            })}
                        />
                    </Card>
                    <Card
                        className={styles.test_time}
                        size={"small"}
                        title={<div className={styles.card_header}>检测时间：2021年03月03日 星期三</div>}>
                        <Table
                            dataSource={data}
                            columns={columns}
                            bordered
                            size="large"
                            pagination={false}
                        />
                    </Card>
                    <Card
                        className={styles.test_about}
                        size={"small"}
                    >
                        <div className={styles.test_about_header}>
                            <BulbOutlined className={styles.icon}/>
                            关于血压    
                        </div>
                        <span className={styles.test_about_content}>血糖也叫做葡萄糖，是血液中最主要的糖类，也是身体能量的主要来源。</span>
                    </Card>
                </div>
                <Card
                    className={styles.blood_sugar_trends}
                    size={"small"}
                    title={<div className={styles.card_header}>血糖趋势</div>}
                >
                    <div className={styles.blood_sugar_trends_content} id="main" ref={chartsRef}>
                        折线图
                    </div>
                </Card>
            </Spin>
        </main>
    )
}

export default memo(BloodSugar);
