!function(t){"use strict"
;var e=setTimeout,n=clearTimeout,i={
now:function(){return Date.now()},
setTimeout:"undefined"==typeof window?setTimeout:function(){
return e.apply(window,arguments)},
clearTimeout:"undefined"==typeof window?clearTimeout:function(){
return n.apply(window,arguments)}}
;function o(t,e){return t<e}class l{
constructor({objectPool:t,lessThanFunc:e}={}){
this._size=0,this._root=null,this.merge=r,
this.collapse=s,this._objectPool=t,this._lessThanFunc=e||o
}clear(){this._root=null,this._size=0}get size(){
return this._size}add(t){
let e=null!=this._objectPool?this._objectPool.get():null
;return null==e?e={child:null,next:null,prev:null,
item:t
}:e.item=t,this._size++,this._root=r(this._root,e,this._lessThanFunc),e
}getMin(){const{_root:t}=this
;return null==t?void 0:t.item}getMinNode(){
return this._root}deleteMin(){const{_root:t}=this
;if(null==t)return;const e=t.item
;return this.delete(t),e}delete(t){var e
;if(t===this._root)this._root=s(t.child,this._lessThanFunc);else{
if(null==t.prev){
if(this._objectPool)throw new Error("The node is already deleted. Don't use the objectPool to prevent this error.")
;return}
t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,null!=t.next&&(t.next.prev=t.prev),
this._root=r(this._root,s(t.child,this._lessThanFunc),this._lessThanFunc)
}
t.child=null,t.prev=null,t.next=null,t.item=void 0,null===(e=this._objectPool)||void 0===e||e.release(t),
this._size--}decreaseKey(t){
t!==this._root&&(t.prev.child===t?t.prev.child=t.next:t.prev.next=t.next,
null!=t.next&&(t.next.prev=t.prev),
this._root=r(this._root,t,this._lessThanFunc))}
get isEmpty(){return null==this._root}
[Symbol.iterator](){return this._iterate(!1)}
nodes(){return{
[Symbol.iterator]:()=>this._iterate(!0)}}
_iterate(t){const e=this._lessThanFunc
;return function*n(i){
i&&(t?yield i:yield i.item,i.child&&(null!=i.child.next&&(i.child=s(i.child,e),
i.child.prev=i),yield*n(i.child)))}(this._root)}}
function r(t,e,n){let i,o
;return null==t?e:null==e||t===e?t:(n(e.item,t.item)?(i=e,
o=t):(i=t,o=e),o.next=i.child,
null!=i.child&&(i.child.prev=o),o.prev=i,i.child=o,
i.next=null,i.prev=null,i)}function s(t,e){
let n,i,o,l,s;if(null==t)return null
;for(l=t,n=null;null!=l;){
if(i=l,o=i.next,null==o){i.prev=n,n=i;break}
l=o.next,s=r(i,o,e),s.prev=n,n=s}
for(s=null;null!=n;)l=n.prev,s=r(s,n,e),n=l
;return s}function u(t,e){
return!(t.time>e.time)&&(t.time<e.time||!(t.id>e.id)&&t.id<e.id)
}var h=function(){function t(){
this._now=1,this._nextId=0,this._handles=new l({
lessThanFunc:u})}
return t.prototype.addTime=function(t){
this.setTime(this._now+t)
},t.prototype.setTime=function(t){
var e=this._handles,n=this._now
;if(t<this._now)throw new Error("time (".concat(t,") should be >= now (").concat(n,")"))
;for(;;){var i=e.getMin();if(!i||i.time>t)break
;this._handles.deleteMin(),this._now=i.time,
i.callback()}this._now=t
},t.prototype.now=function(){return this._now
},t.prototype.setTimeout=function(t,e){
return this._handles.add(Object.freeze({
id:this._nextId++,time:this._now+e,callback:t}))
},t.prototype.clearTimeout=function(t){
this._handles.delete(t)},t}()
;t.TimeControllerMock=h,t.timeControllerDefault=i,Object.defineProperty(t,"__esModule",{
value:!0})}({});
