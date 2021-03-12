import { Progress } from "antd";
import React, { useRef } from "react";
import styles from "./style.module.scss";

export interface BloodOxyBarProps {
    title: string;
    value: string;
}
// 心率组件
function EcgRecordBar(props: BloodOxyBarProps) {
    let { title, value } = props;
    return (
        <main className={styles.main}>
            {title && <h3 className={styles.title}>{title}</h3>}
            <div className={styles.progress}>
                <div className={styles.progress_value} style={{left:value+"%"}}>
                    <p>{value}</p>
                    <p></p>
                </div>
                <div className={styles.progress_item}>
                    <Progress percent={100} showInfo={false} className="w-3/4"/>
                    <Progress percent={100} status="exception" showInfo={false} className="w-1/4"/>
                </div>
                <div className={styles.progress_text}>
                    <span>0</span>
                    <span>正常</span>
                    <span>100</span>
                </div>
            </div>
        </main>
    )
}

export default EcgRecordBar;