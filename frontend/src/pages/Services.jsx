import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStore from '../store/store';
import { LayoutGrid, Bot, BrainCircuit, Megaphone, CodeXml, Star } from 'lucide-react';

const Services = () => {
  const { categories } = useStore();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredTasks(categories.flatMap(category => 
        category.tasks.map(task => ({ ...task, categoryId: category.id }))
      ));
    } else {
      const category = categories.find(cat => cat.name === selectedCategory);
      setFilteredTasks(category ? category.tasks.map(task => ({ ...task, categoryId: category.id })) : []);
    }
  }, [selectedCategory, categories]);

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const getCategoryIcon = (categoryName) => {
    switch(categoryName) {
      case 'IT': return <CodeXml />;
      case 'AI & Automation': return <BrainCircuit />;
      case 'Digital Marketing': return <Megaphone />;
      case 'Automation': return <Bot />;
      default: return <LayoutGrid />;
    }
  };

  return (
    <section className="p-6">
      <h1 className='mb-8 text-3xl font-semibold'>Browse Categories</h1>
      <div className='flex flex-wrap gap-4 mb-8'>
        <CategoryLink
          icon={<LayoutGrid />}
          category="All"
          selectedCategory={selectedCategory}
          onClick={() => handleCategoryClick('All')}
        />
        {categories.map(category => (
          <CategoryLink
            key={category.id}
            icon={getCategoryIcon(category.name)}
            category={category.name}
            selectedCategory={selectedCategory}
            onClick={() => handleCategoryClick(category.name)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} categoryId={task.categoryId} />
        ))}
      </div>
    </section>
  );
};

const CategoryLink = ({ icon, category, selectedCategory, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-4 p-4 rounded-lg shadow-lg border-[1px] transition-colors ${
      selectedCategory === category ? 'bg-blue-100 border-blue-500' : 'border-gray-200 hover:bg-gray-50'
    }`}
  >
    <div className={`p-2 ${selectedCategory === category ? 'bg-blue-300' : 'bg-gray-200'} rounded-md`}>{icon}</div>
    <span className='text-xl font-medium'>{category}</span>
  </button>
);

const TaskCard = ({ task, categoryId }) => (
  <Link to={`/services/${categoryId}/${task.id}`}>
    <div className='p-4 rounded-lg hover:bg-neutral-200'>
      <img className='w-auto h-[250px] object-cover rounded-md ' src={task.image} alt={task.name} />
      <h3 className='my-4 font-sans text-2xl font-semibold'>{task.name}</h3>
      <h5 className='my-4 font-sans text-xl text-gray-700'>Starting From: ${task.minPrice}</h5>
      <h6 className='flex items-center'>
        <Star/>
        <span className='mx-2 text-xl font-bold'>4.5</span>
        <span className='text-lg opacity-70'>(102)</span>
      </h6>
    </div>
  </Link>
);

export default Services;