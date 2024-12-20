import { Link } from "react-router";
import { CheckCircle, List, Clock, RefreshCcw } from "lucide-react";


const Home = () => {
    return (
        <div className='flex flex-col gap-16 pb-16'>
            {/* Hero Section */}
            <div className='hero min-h-[70vh] bg-base-200 rounded-box'>
                <div className='hero-content text-center'>
                    <div className='max-w-2xl'>
                        <h1 className='text-5xl font-bold mb-8'>
                            Organize Your Life with Todo App
                        </h1>
                        <p className='text-xl mb-8'>
                            Stay productive and never miss a task with our intuitive todo
                            management system. Simple, fast, and efficient way to organize
                            your daily tasks.
                        </p>
                        <Link to='/todos' className='btn btn-primary btn-lg'>
                            Get Started Now
                        </Link>
                    </div>
                </div>
            </div>
            {/* Features Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body items-center text-center'>
                        <CheckCircle className='w-12 h-12 text-primary mb-4' />
                        <h2 className='card-title'>Easy Task Management</h2>
                        <p>
                            Quickly add, edit, and complete tasks with our intuitive
                            interface.
                        </p>
                    </div>
                </div>

                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body items-center text-center'>
                        <List className='w-12 h-12 text-primary mb-4' />
                        <h2 className='card-title'>Organized Lists</h2>
                        <p>
                            Keep your tasks organized and categorized for better productivity.
                        </p>
                    </div>
                </div>

                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body items-center text-center'>
                        <Clock className='w-12 h-12 text-primary mb-4' />
                        <h2 className='card-title'>Never Miss Deadlines</h2>
                        <p>Track your tasks and complete them in a timely manner.</p>
                    </div>
                </div>

                <div className='card bg-base-100 shadow-xl'>
                    <div className='card-body items-center text-center'>
                        <RefreshCcw className='w-12 h-12 text-primary mb-4' />
                        <h2 className='card-title'>Real-time Updates</h2>
                        <p>Changes are saved and synced instantly across your account.</p>
                    </div>
                </div>
            </div>{/* Stats Section */}
            <div className='stats shadow w-full'>
                <div className='stat place-items-center'>
                    <div className='stat-title'>Tasks Completed</div>
                    <div className='stat-value text-primary'>25.6K</div>
                    <div className='stat-desc'>From January 1st to February 1st</div>
                </div>

                <div className='stat place-items-center'>
                    <div className='stat-title'>Active Users</div>
                    <div className='stat-value text-secondary'>4,200</div>
                    <div className='stat-desc'>↗️ 400 (22%)</div>
                </div>

                <div className='stat place-items-center'>
                    <div className='stat-title'>User Satisfaction</div>
                    <div className='stat-value'>96%</div>
                    <div className='stat-desc'>Based on user reviews</div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className='card lg:card-side bg-base-100 shadow-xl'>
                <div className='card-body text-center lg:text-left'>
                    <h2 className='card-title text-3xl justify-center lg:justify-start'>
                        Ready to Get Started?
                    </h2>
                    <p className='max-w-2xl'>
                        Join thousands of users who have already improved their productivity
                        with our todo app. Start organizing your tasks today and see the
                        difference it makes in your daily life.
                    </p>
                    <div className='card-actions justify-center lg:justify-start'>
                        <Link to='/todos' className='btn btn-primary'>
                            Try it Now
                        </Link>
                        <button className='btn btn-outline'>Learn More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
