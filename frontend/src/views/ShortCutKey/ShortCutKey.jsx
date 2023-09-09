import React, { useImperativeHandle, useRef, useEffect, useState, forwardRef } from "react";
import classes from "./ShortCutKey.module.sass";

const ShortCutKey = () => {
	const [show, setShow] = useState(false);

	return (
		<div className={classes["short-cut-text"]} onClick={() => setShow(!show)}>
			快捷键
			<div
				className={`${classes["short-cut-overlay"]} ${
					show ? classes["short-cut-visible"] : ""
				}`}
			>
				<div className={classes['short-cut-header']}>快捷键：</div>
				<div className={classes['short-cut-item']}>
					<div className={classes['short-cut-label']}>Delete</div>
					<div>删除</div>
				</div>
			</div>
		</div>
	);
};

export default ShortCutKey;
