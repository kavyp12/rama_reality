// backend/routes/filterOptions.ts
import express from 'express';
import FilterOption from '../models/filter';
import Project from '../models/Project';

const router = express.Router();

// 🌟 GET /api/filter-options - Get filter options (manual override OR auto-generated)
router.get('/', async (req, res) => {
  try {
    console.log('📥 GET /api/filter-options - Fetching filter options...');
    
    // 1. Try to get manually configured options first
    let filterOptions = await FilterOption.findOne();
    
    if (filterOptions && filterOptions.useManualOverride) {
      // Admin has set custom filters - use those
      console.log('✅ Using manual filter overrides');
      return res.json({
        success: true,
        data: {
          localities: filterOptions.localities,
          cities: filterOptions.cities,
          states: filterOptions.states,
          bhk: filterOptions.bhk,
          possession: filterOptions.possession,
          propertyType: filterOptions.propertyType,
          sortBy: filterOptions.sortBy,
          isManualOverride: true
        }
      });
    }
    
    // 2. No manual override - auto-generate from database
    console.log('✅ Auto-generating filters from projects');
    const projects = await Project.find({}).select('area city state configurations');
    
    // Extract unique values
    const localities = [...new Set(projects.map(p => p.area).filter(Boolean))].sort();
    const cities = [...new Set(projects.map(p => p.city).filter(Boolean))].sort();
    const states = [...new Set(projects.map(p => p.state).filter(Boolean))].sort();
    
    // Extract BHK types
    const bhkSet = new Set<string>();
    projects.forEach(project => {
      project.configurations?.forEach((config: any) => {
        const bhkMatch = config.type?.match(/(\d+)\s*BHK/i);
        if (bhkMatch) bhkSet.add(`${bhkMatch[1]} BHK`);
      });
    });
    const bhk = [...bhkSet].sort((a, b) => {
      const aNum = parseInt(a.match(/\d+/)![0]);
      const bNum = parseInt(b.match(/\d+/)![0]);
      return aNum - bNum;
    });
    
    // Extract property types
    const propertyTypeSet = new Set<string>();
    projects.forEach(project => {
      project.configurations?.forEach((config: any) => {
        const words = config.type?.split(' ') || [];
        const lastWord = words[words.length - 1];
        if (lastWord && lastWord !== 'BHK') propertyTypeSet.add(lastWord);
      });
    });
    const propertyType = [...propertyTypeSet].sort();
    
    // Static options
    const possession = ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years'];
    const sortBy = ['Relevance', 'New Launch', 'Price: Low to High', 'Price: High to Low', 'Near Possession'];
    
    res.json({
      success: true,
      data: { localities, cities, states, bhk, possession, propertyType, sortBy, isManualOverride: false }
    });
    
  } catch (error: any) {
    console.error('❌ Error fetching filter options:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🌟 GET /api/filter-options/suggestions - Get auto-generated suggestions for admin
router.get('/suggestions', async (req, res) => {
  try {
    console.log('📥 GET /api/filter-options/suggestions - Getting suggestions...');
    
    const projects = await Project.find({}).select('area city state configurations');
    
    const localities = [...new Set(projects.map(p => p.area).filter(Boolean))].sort();
    const cities = [...new Set(projects.map(p => p.city).filter(Boolean))].sort();
    const states = [...new Set(projects.map(p => p.state).filter(Boolean))].sort();
    
    const bhkSet = new Set<string>();
    projects.forEach(project => {
      project.configurations?.forEach((config: any) => {
        const bhkMatch = config.type?.match(/(\d+)\s*BHK/i);
        if (bhkMatch) bhkSet.add(`${bhkMatch[1]} BHK`);
      });
    });
    const bhk = [...bhkSet].sort((a, b) => {
      const aNum = parseInt(a.match(/\d+/)![0]);
      const bNum = parseInt(b.match(/\d+/)![0]);
      return aNum - bNum;
    });
    
    const propertyTypeSet = new Set<string>();
    projects.forEach(project => {
      project.configurations?.forEach((config: any) => {
        const words = config.type?.split(' ') || [];
        const lastWord = words[words.length - 1];
        if (lastWord && lastWord !== 'BHK') propertyTypeSet.add(lastWord);
      });
    });
    const propertyType = [...propertyTypeSet].sort();
    
    res.json({
      success: true,
      data: { localities, cities, states, bhk, propertyType }
    });
    
  } catch (error: any) {
    console.error('❌ Error getting suggestions:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🌟 PUT /api/filter-options - Update filter options (admin only)
router.put('/', async (req, res) => {
  try {
    console.log('📥 PUT /api/filter-options - Updating filters...');
    
    const { localities, cities, states, bhk, possession, propertyType, sortBy, useManualOverride } = req.body;
    
    let filterOptions = await FilterOption.findOne();
    
    if (!filterOptions) {
      filterOptions = new FilterOption({
        localities: localities || [],
        cities: cities || [],
        states: states || [],
        bhk: bhk || ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'],
        possession: possession || ['Ready to Move', 'Upto 1 Year', 'Upto 2 Years', '2+ Years'],
        propertyType: propertyType || ['Flat', 'Villa', 'House', 'Penthouse', 'Duplex'],
        sortBy: sortBy || ['Relevance', 'New Launch', 'Price: Low to High', 'Price: High to Low', 'Near Possession'],
        useManualOverride: useManualOverride ?? true
      });
    } else {
      if (localities !== undefined) filterOptions.localities = localities;
      if (cities !== undefined) filterOptions.cities = cities;
      if (states !== undefined) filterOptions.states = states;
      if (bhk !== undefined) filterOptions.bhk = bhk;
      if (possession !== undefined) filterOptions.possession = possession;
      if (propertyType !== undefined) filterOptions.propertyType = propertyType;
      if (sortBy !== undefined) filterOptions.sortBy = sortBy;
      if (useManualOverride !== undefined) filterOptions.useManualOverride = useManualOverride;
    }
    
    await filterOptions.save();
    
    console.log('✅ Filter options updated');
    res.json({ success: true, data: filterOptions });
    
  } catch (error: any) {
    console.error('❌ Error updating filters:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 🌟 DELETE /api/filter-options - Reset to auto-generated filters
router.delete('/', async (req, res) => {
  try {
    console.log('📥 DELETE /api/filter-options - Resetting to auto-generated...');
    
    const filterOptions = await FilterOption.findOne();
    
    if (filterOptions) {
      filterOptions.useManualOverride = false;
      await filterOptions.save();
    }
    
    console.log('✅ Reset to auto-generated filters');
    res.json({ success: true, message: 'Filters reset to auto-generated mode' });
    
  } catch (error: any) {
    console.error('❌ Error resetting filters:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;