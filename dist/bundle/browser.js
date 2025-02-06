!function(e){"use strict";var t=function(){
function e(){this._handles=new Set}
return e.prototype.now=function(){
return Date.now()
},Object.defineProperty(e.prototype,"queueSize",{
get:function(){return this._handles.size},
enumerable:!1,configurable:!0
}),e.prototype.setTimeout=function(e,t){
var n=this,i=setTimeout((function(){
n._handles.delete(i),e()}),t)
;return this._handles.add(i),e
},e.prototype.clearTimeout=function(e){
clearTimeout(e),this._handles.delete(e)},e
}(),n=new t;function i(e,t){return e<t}class o{
constructor({objectPool:e,lessThanFunc:t}={}){
this._size=0,this._root=null,this.merge=l,
this.collapse=r,this._objectPool=e,this._lessThanFunc=t||i
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(e){
let t=null!=this._objectPool?this._objectPool.get():null
;return null==t?t={child:null,next:null,prev:null,
item:e
}:t.item=e,this._size++,this._root=l(this._root,t,this._lessThanFunc),t
}getMin(){const{_root:e}=this
;return null==e?void 0:e.item}getMinNode(){
return this._root}deleteMin(){const{_root:e}=this
;if(null==e)return;const t=e.item
;return this.delete(e),t}delete(e){var t
;if(e===this._root)this._root=r(e.child,this._lessThanFunc);else{
if(null==e.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
e.prev.child===e?e.prev.child=e.next:e.prev.next=e.next,null!=e.next&&(e.next.prev=e.prev),
this._root=l(this._root,r(e.child,this._lessThanFunc),this._lessThanFunc)
}
e.child=null,e.prev=null,e.next=null,e.item=void 0,null===(t=this._objectPool)||void 0===t||t.release(e),
this._size--}decreaseKey(e){
e!==this._root&&(e.prev.child===e?e.prev.child=e.next:e.prev.next=e.next,
null!=e.next&&(e.next.prev=e.prev),
this._root=l(this._root,e,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(e){const t=this._lessThanFunc
;return function*n(i){
i&&(e?yield i:yield i.item,i.child&&(null!=i.child.next&&(i.child=r(i.child,t),
i.child.prev=i),yield*n(i.child)))}(this._root)}}
function l(e,t,n){let i,o
;return null==e?t:null==t||e===t?e:(n(t.item,e.item)?(i=t,
o=e):(i=e,o=t),o.next=i.child,
null!=i.child&&(i.child.prev=o),o.prev=i,i.child=o,
i.next=null,i.prev=null,i)}function r(e,t){
let n,i,o,r,s;if(null==e)return null
;for(r=e,n=null;null!=r;){
if(i=r,o=i.next,null==o){i.prev=n,n=i;break}
r=o.next,s=l(i,o,t),s.prev=n,n=s}
for(s=null;null!=n;)r=n.prev,s=l(s,n,t),n=r
;return s}function s(e,t){
return!(e.time>t.time)&&(e.time<t.time||!(e.id>t.id)&&e.id<t.id)
}var u=function(){function e(){
this._now=1,this._nextId=0,this._handles=new o({
lessThanFunc:s})}
return Object.defineProperty(e.prototype,"queueSize",{
get:function(){return this._handles.size},
enumerable:!1,configurable:!0
}),e.prototype.addTime=function(e){
this.setTime(this._now+e)
},e.prototype.setTime=function(e){
var t=this._handles,n=this._now
;if(e<this._now)throw new Error("time (".concat(e,") should be >= now (").concat(n,")"))
;for(;;){var i=t.getMin();if(!i||i.time>e)break
;this._handles.deleteMin(),this._now=i.time,
i.callback()}this._now=e
},e.prototype.now=function(){return this._now
},e.prototype.setTimeout=function(e,t){
return this._handles.add(Object.freeze({
id:this._nextId++,time:this._now+t,callback:e}))
},e.prototype.clearTimeout=function(e){
this._handles.delete(e)},e}()
;e.TimeControllerDefault=t,e.TimeControllerMock=u,e.timeControllerDefault=n,
Object.defineProperty(e,"__esModule",{value:!0})
}({});
