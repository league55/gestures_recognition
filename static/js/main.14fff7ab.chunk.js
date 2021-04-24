(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{244:function(t,e,n){"use strict";n.r(e),n.d(e,"getDistance",(function(){return a})),n.d(e,"normalizeCoordinates",(function(){return r}));var a=function(t,e){var n=Math.pow(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2),.5);console.debug("distanceRaw",n);var a=n/((t.z+e.z)/2);console.debug("distanceReal",a)},r=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e={leftX:1,bottomY:1,rightX:0,topY:0},n={leftX:0,bottomY:0,rightX:1,topY:1};t.forEach((function(t){e.leftX=Math.min(e.leftX,t.x),e.rightX=Math.max(e.rightX,t.x),e.bottomY=Math.min(e.bottomY,t.y),e.topY=Math.max(e.topY,t.y)}));var a=n.rightX,r=n.topY,s=e.rightX-e.leftX,i=e.topY-e.bottomY,c=a/s,o=r/i,u=t.map((function(t){return{x:t.x-e.leftX,y:t.y-e.bottomY}})),l=u.map((function(t){return{x:t.x*c,y:t.y*o}}));return[u,l]}},330:function(t,e,n){},332:function(t,e,n){},338:function(t,e){},339:function(t,e){},347:function(t,e){},350:function(t,e){},351:function(t,e){},432:function(t,e,n){},433:function(t,e,n){},435:function(t,e,n){"use strict";n.r(e);var a=n(55),r=n.n(a),s=n(299),i=n.n(s),c=(n(330),n(3)),o=n.n(c),u=n(14),l=n(16),d=n(2),h=n(9),f=n(40),p=n(12),v=n(13),b=(n(249),n(332),n(121)),m=n(169),j=n(300),O=n(112),x=new O.FPS,g=function(){};function y(t,e){var n=new m.Hands({locateFile:function(t){return"https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/".concat(t)}});return n.onResults((function(n){return function(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:g,a=e.getContext("2d");if(x.tick(),a.save(),a.clearRect(0,0,e.width,e.height),a.drawImage(t.image,0,0,e.width,e.height),t.multiHandLandmarks&&t.multiHandedness)for(var r=0;r<t.multiHandLandmarks.length;r++){var s="Right"===t.multiHandedness[r].label,i=t.multiHandLandmarks[r];Object(b.drawConnectors)(a,i,m.HAND_CONNECTIONS,{color:s?"#00FF00":"#FF0000"}),Object(b.drawLandmarks)(a,i,{color:s?"#00FF00":"#FF0000",fillColor:s?"#FF0000":"#00FF00",radius:function(t){return Object(b.lerp)(t.from.z,-.15,.1,10,1)}})}a.restore(),n(t)}(n,t,e)})),n}var w=n(39),k=function(t){Object(p.a)(n,t);var e=Object(v.a)(n);function n(t){var a;return Object(d.a)(this,n),(a=e.call(this,t)).state={counter:0},a.input_video=r.a.createRef(),a.output_canvas=r.a.createRef(),a.control_panel=r.a.createRef(),a}return Object(h.a)(n,[{key:"shouldComponentUpdate",value:function(t,e,n){return!1}},{key:"componentDidMount",value:function(){var t=this,e=y(this.output_canvas.current,(function(e){if(e.multiHandLandmarks&&t.state.counter%20===0)return t.setState({counter:0}),t.props.callback(e.multiHandLandmarks);t.setState({counter:t.state.counter+1})}));!function(t,e){new j.Camera(t,{onFrame:function(){var n=Object(l.a)(o.a.mark((function n(){return o.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.send({image:t});case 2:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}(),width:480,height:360}).start()}(this.input_video.current,e),function(t,e,n){new O.ControlPanel(t,{selfieMode:!0,maxNumHands:1,minDetectionConfidence:.8,minTrackingConfidence:.5}).add([new O.StaticText({title:"MediaPipe Hands"}),x,new O.Toggle({title:"Selfie Mode",field:"selfieMode"}),new O.Slider({title:"Max Number of Hands",field:"maxNumHands",range:[1,4],step:1}),new O.Slider({title:"Min Detection Confidence",field:"minDetectionConfidence",range:[0,1],step:.01}),new O.Slider({title:"Min Tracking Confidence",field:"minTrackingConfidence",range:[0,1],step:.01})]).on((function(t){e.classList.toggle("selfie",t.selfieMode),n.setOptions(t)}))}(this.control_panel.current,this.input_video.current,e)}},{key:"render",value:function(){return Object(w.jsxs)("div",{children:[Object(w.jsxs)("div",{className:"video-container",children:[Object(w.jsx)("video",{className:"input_video",ref:this.input_video}),Object(w.jsx)("canvas",{className:"output_canvas",ref:this.output_canvas,width:"480px",height:"360px"})]}),Object(w.jsx)("div",{className:"control-panel",ref:this.control_panel})]})}}]),n}(r.a.Component),C=function(){var t=Object(l.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",fetch("http://localhost:3300/data").then((function(t){return t.text()})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),M=n(244).normalizeCoordinates;function D(t){return{label:t[t.length-1],features:M(t.slice(0,t.length-1))[1].map((function(t){return[t.x,t.y]}))}}var S=function(t){var e=[];return t.forEach((function(t){var n=D(t),a=n.label,r=n.features;e.push([r,a])})),e},_=n(7),F=n(296),R=n(352),P=["palm","fist"];function N(){return(N=Object(l.a)(o.a.mark((function t(e,n){var a,r,s,i,c,u,l;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=n.trainXs,r=n.trainYs,s=n.testXs,i=n.testYs,c=["loss","val_loss","acc","val_acc"],u={name:"Model Training",tab:"Model",styles:{height:"1000px"}},l=R.show.fitCallbacks(u,c),t.abrupt("return",e.fit(a,r,{epochs:35,shuffle:!0,validationData:[s.squeeze(),i.squeeze()],callbacks:l}).then((function(t){return console.log(t),e})));case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function T(t,e){var n=e.testXs,a=e.testYs;return[t.predict(n).argMax(-1),a]}function X(t,e){return Y.apply(this,arguments)}function Y(){return(Y=Object(l.a)(o.a.mark((function t(e,n){var a,r,s,i,c,u;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=T(e,n),r=Object(_.a)(a,2),s=r[0],i=r[1],t.next=3,R.metrics.perClassAccuracy(i.argMax(-1),s);case 3:c=t.sent,u={name:"Accuracy",tab:"Evaluation"},R.show.perClassAccuracy(u,c,P);case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function L(t,e){return H.apply(this,arguments)}function H(){return(H=Object(l.a)(o.a.mark((function t(e,n){var a,r,s,i,c,u;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=T(e,n),r=Object(_.a)(a,2),s=r[0],i=r[1],t.next=3,R.metrics.confusionMatrix(i.argMax(-1),s);case 3:c=t.sent,u={name:"Confusion Matrix",tab:"Evaluation"},R.render.confusionMatrix(u,{values:c,tickLabels:P});case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function z(){return(z=Object(l.a)(o.a.mark((function t(e,n){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,X(e,n);case 2:return t.next=4,L(e,n);case 4:return t.abrupt("return",{trainedModel:e,dataPacks:n});case 5:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function G(t){var e=t.trainedModel,n=t.dataPacks,a=n.trainXs,r=n.trainYs,s=n.testXs,i=n.testYs;return a.dispose(),r.dispose(),s.dispose(),i.dispose(),e}var E=function(t){var e=function(){var t=F.sequential();t.add(F.layers.flatten({inputShape:[21,2]})),t.add(F.layers.dense({inputShape:[21],activation:"relu",units:15})),t.add(F.layers.dense({inputShape:[15],activation:"relu",units:10})),t.add(F.layers.dense({inputShape:[10],activation:"relu",units:5})),t.add(F.layers.dense({activation:"softmax",units:2})),t.compile({loss:"sparseCategoricalCrossentropy",optimizer:F.train.adam(),metrics:["accuracy"]}),t.summary();var e=F.train.adam();return t.compile({optimizer:e,loss:"categoricalCrossentropy",metrics:["accuracy"]}),t}(t.length),n=function(t){var e=[];t.forEach((function(t){e.push([t[0],["palm"===t[1]?1:0,"fist"===t[1]?1:0]])})),F.util.shuffle(e),console.log(e);var n=Math.round(.9*t.length),a=e.slice(0,n),r=e.slice(n,e.length);return{trainXs:F.tensor3d(a.map((function(t){return t[0]}))),trainYs:F.tensor2d(a.map((function(t){return t[1]}))),testXs:F.tensor3d(r.map((function(t){return t[0]}))),testYs:F.tensor2d(r.map((function(t){return t[1]})))}}(t);return function(t,e){return N.apply(this,arguments)}(e,n).then((function(t){return function(t,e){return z.apply(this,arguments)}(t,n)})).then(G)},A=function(){var t=Object(l.a)(o.a.mark((function t(e,a){var r,s;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=n(296),s=e.predict(r.tensor(a).expandDims()),t.abrupt("return",s.data().then((function(t){return t})));case 3:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),U=(n(431),n(432),function(t){Object(p.a)(n,t);var e=Object(v.a)(n);function n(t){var a;return Object(d.a)(this,n),(a=e.call(this,t)).state={baseData:void 0,dynamicData:[],usePreloaded:!0},a.handleTrain=a.handleTrain.bind(Object(f.a)(a)),a.handlePreloadedChange=a.handlePreloadedChange.bind(Object(f.a)(a)),a}return Object(h.a)(n,[{key:"shouldComponentUpdate",value:function(t,e,n){return!(!t.lastGesture||!t.model)||this.state.usePreloaded!==e.usePreloaded}},{key:"componentDidMount",value:function(){var t=Object(l.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C();case 2:e=t.sent,this.setState({baseData:e});case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"addDataRow",value:function(t,e){var n=[].concat(Object(u.a)(t),[e]);console.log("New entry",n),this.state.dynamicData.push(n),console.log("dataset size is now: "+this.state.dynamicData.length),this.setState(Object.assign({},this.state,{dynamicData:this.state.dynamicData}))}},{key:"handleTrain",value:function(){var t=Object(l.a)(o.a.mark((function t(){var e,n,a=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.state.usePreloaded?(r=this.state.baseData,r.split("\n").filter((function(t){return t.length})).map((function(t){try{return JSON.parse("["+t+"]")}catch(e){return}})).filter((function(t){return!!t}))).concat(this.state.dynamicData):this.state.dynamicData,n=S(e),E(n).then((function(t){a.props.handleModelChange(t)}));case 3:case"end":return t.stop()}var r}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"handlePreloadedChange",value:function(t){this.setState(Object.assign({},this.state,{usePreloaded:!this.state.usePreloaded}))}},{key:"render",value:function(){var t=this;return Object(w.jsxs)("div",{className:"button-grp",children:[Object(w.jsx)("button",{id:"trainBtn",onClick:this.handleTrain,children:"Train"}),Object(w.jsxs)("div",{children:[Object(w.jsx)("input",{type:"checkbox",id:"usePreloaded",checked:this.state.usePreloaded,onChange:this.handlePreloadedChange}),"Use preloadedData"]}),Object(w.jsxs)("div",{children:[Object(w.jsx)("button",{id:"addRowOk",onClick:function(){return t.addDataRow(t.props.lastGesture,"palm")},children:"Add Palm entry"}),Object(w.jsx)("button",{id:"addRowNone",onClick:function(){return t.addDataRow(t.props.lastGesture,"fist")},children:"Add Fist entry"})]})]})}}]),n}(r.a.Component)),I=function(t,e){var n=t.getContext("2d");n.save(),n.clearRect(0,0,t.width,t.height),n.fillStyle="blue",n.fillRect(0,0,t.width,t.height);var a=e;Object(b.drawConnectors)(n,a,m.HAND_CONNECTIONS,{color:"#00FF00"}),Object(b.drawLandmarks)(n,a,{color:"#00FF00",fillColor:"#FF0000",radius:function(){return.1}}),n.restore()},B=n(244),J=function(t){Object(p.a)(n,t);var e=Object(v.a)(n);function n(t){var a;return Object(d.a)(this,n),(a=e.call(this,t)).canvas_original=r.a.createRef(),a.canvas_left_bot=r.a.createRef(),a.canvas_norm=r.a.createRef(),a.handleTest=a.handleTest.bind(Object(f.a)(a)),a}return Object(h.a)(n,[{key:"shouldComponentUpdate",value:function(t,e,n){return!1}},{key:"componentDidMount",value:function(){var t=Object(l.a)(o.a.mark((function t(){return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"handleTest",value:function(){var t=Object(l.a)(o.a.mark((function t(){var e,n,a,r,s;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:(e=this.props.points)&&(I(this.canvas_original.current,e),n=Object(B.normalizeCoordinates)(e),a=Object(_.a)(n,2),r=a[0],s=a[1],I(this.canvas_left_bot.current,r),I(this.canvas_norm.current,s));case 2:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(w.jsxs)("div",{children:[Object(w.jsx)("button",{id:"test",onClick:this.handleTest,children:"Test"}),Object(w.jsx)("div",{children:Object(w.jsx)("canvas",{ref:this.canvas_original,width:"480px",height:"360px"})}),Object(w.jsx)("div",{children:Object(w.jsx)("canvas",{ref:this.canvas_left_bot,width:"480px",height:"360px"})}),Object(w.jsx)("div",{children:Object(w.jsx)("canvas",{ref:this.canvas_norm,width:"480px",height:"360px"})})]})}}]),n}(r.a.Component),q=(n(433),function(t){Object(p.a)(n,t);var e=Object(v.a)(n);function n(t){var a;return Object(d.a)(this,n),(a=e.call(this,t)).state={label:"",data:[],model:void 0,lastGestureLabel:void 0},a.handleLabelChange=a.handleLabelChange.bind(Object(f.a)(a)),a.handleDataResults=a.handleDataResults.bind(Object(f.a)(a)),a.handleSaveResults=a.handleSaveResults.bind(Object(f.a)(a)),a.handleModelChange=a.handleModelChange.bind(Object(f.a)(a)),a}return Object(h.a)(n,[{key:"handleLabelChange",value:function(t){this.setState(Object.assign({},this.state,{label:t.target.value}))}},{key:"handleModelChange",value:function(t){this.setState(Object.assign({},this.state,{model:t}))}},{key:"handleDataResults",value:function(){var t=Object(l.a)(o.a.mark((function t(e){var n,a,r,s,i;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=this.state.lastGestureLabel,!this.state.model||!e){t.next=9;break}return c=e[0].concat("lable_unknown"),a=D(c),t.next=5,A(this.state.model,a.features);case 5:r=t.sent,s=["Palm ","Fist ","Undefined "],i=r.indexOf(Math.max.apply(Math,Object(u.a)(r))),n=r[i]>.5?s[i]+Math.round(100*r[i])/100:"Undefined "+Math.round(100*r[1])/100;case 9:this.setState(Object.assign({},this.state,{data:e,lastGestureLabel:n}));case 10:case"end":return t.stop()}var c}),t,this)})));return function(e){return t.apply(this,arguments)}}()},{key:"handleSaveResults",value:function(){var t;console.log(this.state.data),t={data:this.state.data[0],label:this.state.label},fetch("http://localhost:3300/raw",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then((function(t){return t.text().then((function(t){return console.log(t)}))}))}},{key:"render",value:function(){var t=this.state.data?this.state.data[0]:"";return Object(w.jsx)("div",{className:"container",children:Object(w.jsxs)("div",{children:[Object(w.jsx)(k,{callback:this.handleDataResults}),Object(w.jsxs)("div",{className:"data_panel",children:[Object(w.jsxs)("span",{children:["lastGesture: ",this.state.lastGestureLabel]}),Object(w.jsx)("div",{}),Object(w.jsx)(J,{points:this.state.data&&this.state.data[0]})]}),Object(w.jsx)("div",{className:"button-grp",children:Object(w.jsx)("button",{id:"saveBtn",onClick:this.handleSaveResults,disabled:!0,children:"Persist data"})}),Object(w.jsx)(U,{handleModelChange:this.handleModelChange,lastGesture:t,model:this.state.model,handlePredict:this.handlePredict})]})})}}]),n}(r.a.Component)),K=function(t){t&&t instanceof Function&&n.e(3).then(n.bind(null,443)).then((function(e){var n=e.getCLS,a=e.getFID,r=e.getFCP,s=e.getLCP,i=e.getTTFB;n(t),a(t),r(t),s(t),i(t)}))};i.a.render(Object(w.jsx)(r.a.StrictMode,{children:Object(w.jsx)(q,{})}),document.getElementById("root")),K()}},[[435,1,2]]]);
//# sourceMappingURL=main.14fff7ab.chunk.js.map