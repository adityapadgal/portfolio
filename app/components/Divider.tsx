const Divider = () => {
    const posts = [
        {
          id: 1,
          title: 'LLM-Powered Clinical Intelligence – Optimizing RAG Pipelines, DeepSeek Inference, and NeuroBERT for Scalable AI-Driven Healthcare.',
          href: '#',
          description:
            `Engineered a retrieval-augmented generation (RAG) pipeline with LangChain, PyTorch, and FAISS to index and retrieve 150K+ clinical trials, ensuring precise patient-trial matching.
            Optimized DeepSeek-r1:8B inference using P-Tuning and Thread-of-Thought (ToT), reducing hallucinations by 70% and enhancing structured JSON-based eligibility assessments.
            Developed NeuroBERT, a PubMedBERT-based NLP model trained on 1M+ neuropathology reports, accelerating Alzheimer's research by 40% through automated insight extraction.`,
          date: 'Sept. 2024 - Present',
          category: { title: 'Healthcare', href: '#' },
          author: {
            name: 'Machine Learning Engineer',
            role: 'Indiana University Bloomington',
            href: '#',
            imageUrl:
              '/thumbnail_iu.png',
          },
        },
        {
            id: 2,
            title: 'Cloud-Native Disaster Recovery & Data Engineering – Multi-Cloud Resilience, High-Throughput Pipelines, and Real-Time Processing at Scale.',
            href: '#',
            description:
              `Architected a multi-cloud, active-active disaster recovery system using Amazon S3 & Azure Blob Storage, achieving 99.98% uptime with automated geo-replication.
              Built scalable data pipelines with AWS Step Functions, Azure Data Factory, and Snowflake, leveraging CDC-based AWS DMS to cut processing latency to sub-second levels.
              Reduced ETL pipeline runtime from 5 hours to 30 minutes, integrating AWS Lambda & SageMaker to improve data quality checks, cutting manual review time by 70%.`,
            date: 'Jan. 2021 - Aug. 2023',
            category: { title: 'Insurance | Fraud', href: '#' },
            author: {
              name: 'Data Engineer',
              role: 'Quantiphi, Inc',
              href: '#',
              imageUrl:
                '/thumbnail_quantiphi.jpg',
            },
          },
          {
            id: 3,
            title: 'AI-Driven Law Enforcement Systems – Secure, Low-Latency Communication & Scalable Infrastructure for Mission-Critical Operations.',
            href: '#',
            description:
              `Developed a low-latency, AI-enhanced law enforcement data pipeline, supporting real-time processing of 500K+ records/sec with AWS Lambda and Apache Kafka.
              Designed a secure, end-to-end encrypted communication system leveraging WebRTC, Signal Protocol, and AWS KMS, ensuring mission-critical data confidentiality.
              Implemented edge AI models using TensorFlow Lite & OpenVINO for on-device video analytics, enabling real-time threat detection in high-risk environments.`,
            date: 'July 2019 - Oct. 2019',
            category: { title: 'Public Research', href: '#' },
            author: {
              name: 'Software Developer Intern',
              role: 'Centre for Police Research',
              href: '#',
              imageUrl:
                '/thumbnail_police.jpeg',
            },
          },
      ]
  return (
    <div className="text-white py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty sm:text-5xl">From the Start, Growth.</h2>
            <p className="mt-2 text-lg/8 ">From learning to leading, each step has been a milestone. Let's talk work experiences.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-start justify-between group transition-all duration-300 hover:shadow-lg hover:bg-gray-900 p-4 rounded-lg">
              <div className="flex items-center gap-x-4 text-xs">
                {post.date}
                <a
                  href={post.category.href}
                  className="relative z-10 rounded-full bg-white px-3 py-1.5 font-medium text-black hover:bg-gray-200"
                >
                  {post.category.title}
                </a>
              </div>
              <div className="relative">
                <h3 className="mt-3 text-lg/6 font-semibold">
                  <a href={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </a>
                </h3>
                {/* Initially hidden, fully visible on hover */}
                <p className="mt-5 text-sm/6 line-clamp-5 group-hover:line-clamp-none group-hover:max-h-full group-hover:overflow-visible transition-all duration-300 ease-in-out">
                  {post.description}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4">
                <img alt="" src={post.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold">
                    <a href={post.author.href}>
                      <span className="absolute inset-0" />
                      {post.author.name}
                    </a>
                  </p>
                  <p className="">{post.author.role}</p>
                </div>
              </div>
            </article>
            ))}
          </div>
        </div>
      </div>
  );
}

export default Divider