这个小demo主要实现了canvas自由画笔功能
1.流程
获取dom元素后需要getcontext()设置才能画图
2.几种事件。mouseout,mouseup,mousemove,mousedown
3.canvas,关于线条的相关属性：linecap,linejoin,linewidth等，如何实现渐变色循环hsl（z值在1到360，饱和度，亮度）
4.解构和经典赋值的区别
5.画连续线的逻辑，需要一直积累前一个点
6.事件的特殊对象event涉及到的clientX与offsetx的区别