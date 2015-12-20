import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'
import Navigator from './Navigator'
import avatar from './avatar.jpg'
import styles from './Article.css'

export default class Home extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <div>
        <Navigator white={true}/>
        <div className={[styles.back]}></div>
        <section className={styles.container}>
            <div className={styles.wrap}>
                <h1 className="title">
				Some thoughts on ele.me hackathon
			</h1>
                <article>
			<h1>What’s this?</h1>
<p>Well, this is my first time to write articles in English. Recently, I attend an activity named <a href="http://Ele.me">Ele.me</a> Hackathon(<a href="http://www.ele.me">www.ele.me</a> is a company provides campus food take-out service.) with
my senior fellow student, he is very well-qualified with techniques who is learning Data Mining as a graduate in NEU. We’re both instered in this kind of contest and then we
decide to participate in.</p>
<h1>How it plays?</h1>
<img src="http://t11.baidu.com/it/u=619180273,1394682420&fm=58"/>
<p>First of all, we read the specification of the activity on their gitlab. What we should do is to develop an high-performance server program according to their requirement by using
languages Python, Java or Golang and they provide a small cluster consists of 3 servers and 1 mysql machine and 1 redis machine. The requirement is to implement services such as <code>sign in</code>, <code>sign up</code>, <code>view food</code>, <code>add to cart</code>, <code>place order</code>, <code>view orders</code>, they provides
<code>Vagrant</code> virtual machine with Redis, Mysql, Runtime and Data installed in it. Obviously, they also provides us with unit tests and benchmark. All we should do is to improve
the benchmark score as high as possible in condition of passing all unit tests.</p>
<p>After discussing, we finally decided to implement it by Java which is high performance and high concurrency. Because of time limited, we chose <code>Jetty</code> to deal with HTTP
requests. And then we built up different layers such as Model, Action, Service and Storage. It looks well origanized and pretty nice, but unfortunately, we struggled to pass all the test cases, only to find that we just got about <code>40+</code> s/per order of benchmark in local machine.</p>
<h1>Hardship</h1>
<p>During contest, my teammate Zhi Wang flied to New York for a conference only left me doing the coding.</p>
<p>I had to think about that <code>why our program's concurrency is so low?</code>, we know <code>Jetty</code> is also using <code>NIO</code>, but maybe the framework is a bit heavy. Because of my previous hand-on experience of Golang, I finally decided to using golang by following reasons, firstly, I am not familiar with either  Java or Golang because I was devoted to Front-end Techniques before. Moreover, I think go is more clean and simple than Java especially in high-concurrency aspect. So I spent two night coding and finished the first version. Finally, we got <code>80+</code> per order/s concurrency in local machine and got <code>573+</code> per order/s in remote server which makes us be <code>top 20</code>.</p>
<p>And then we considered that we were in the right directions. we continued to do <code>profiling</code> works, replacing those slow or blocking operations. One thing that I have to mention is <code>Redis</code>, it’s a <code>cache</code> but is not so easy to tackle with. The strategy we use is to store <code>immutable</code> data in memory and <code>mutable</code> data in <code>Redis</code> cache to share the state between three machines.</p>
<p>However, the way how we define the storage structure in Redis influence a lot. If we use JSON marshal, we can easily store and fetch it, but it will cause some performance loss. If we use <code>hash table</code> or some built-in structures, we will be caught in dealing with storage design. Because of ambition, we finally choose the the latter one solution and use more basic HTTP handler, unfortunately, we didn’t get the expected result.</p>
<h1>Final Struggle</h1>
<p>We had tried almost every methods we know to improve it. One day of the last days, Zhi Wang suddenly sent me a link, which is a example of high concurrency server by <code>Redis</code>and built-in <code>Lua</code>. We were all excited, “This must be definitely right solution”. It was just five days left, and we quickly finished <code>Lua</code> script and built it into <code>Golang</code>. When we had done, we found it doesn’t pass the test cases because of <code>data consistency</code>, is there <code>data race</code> happens or something wrong in our code? Redis’s lua runs in serial ways which is not expected to perform in that way. We can’t solve it even in the last day.</p>
<p>But it just happened intermittently, luckily, we got <code>300+</code> per order/s in local machine which is what we were expected. But because of request failure, we finally couldn’t catch up with top 20. After that, we found the solution we choose was almost the same of the official implementation.</p>
<h1>Introspection</h1>
<p>After contest, we discussed the failure of requests failure. In request handler, we run a <code>goroutine</code> each request, which is quite a lot expense.
In concurrent system, we thought,</p>
<ul>
<li>We should design a <code>Request Queue</code> to <code>Enqueue</code> each request and <code>Dequeue</code> to process every request later on instead of hanlding instantly.</li>
<li><code>Cache</code> will do benefit to system performance but we should make some efforts to design it.</li>
<li><code>Consistency</code> is very improtant in distributed system or we will get error in procedure.</li>
</ul>
<p>That’s it, althought we didn’t got prize in this contest finally, we learnt a lot about <code>High Concurrency</code> and <code>Distributed System</code>, that’s what we want to do and steep in.</p>
<p><a href="https://github.com/ele828/eleme-hackathon">=&gt;Open source code </a></p>

			</article>
            </div>
        </section>
      </div>
    )
  }

}
